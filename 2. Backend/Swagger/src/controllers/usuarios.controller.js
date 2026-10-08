import { supabase } from '../supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { registrarAuditoria } from '../helpers/auditoria.helper.js';

// Configuración global estandarizada para la Cookie
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,       // 'false' para desarrollo local (HTTP)
    sameSite: 'lax',     // Permite el envío entre puertos en localhost
    path: '/',           // Garantiza disponibilidad en TODO el sitio
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
};

// Función auxiliar para subir la imagen a Supabase Storage
const subirImagenPerfil = async (file, idUsuario) => {
    const fileExt = file.originalname.split('.').pop();
    const fileName = `avatar-${idUsuario}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // 1. Subir la imagen al bucket 'profiles'
    const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true
        });

    if (uploadError) throw new Error(`Error al subir la imagen: ${uploadError.message}`);

    // 2. Obtener la URL pública
    const { data: publicURLData } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

    return publicURLData.publicUrl;
};

// 1. OBTENER TODOS LOS USUARIOS (GET) - SIN FILTRO PARA VER ACTIVOS E INACTIVOS
export const getUsuarios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. BUSCAR UN USUARIO POR ID (GET)
export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('idusuario', id)
            .single();

        if (error || !data) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. REGISTRAR / CREAR NUEVO USUARIO (POST - Con Contraseña Encriptada y opción de foto)
export const createUsuario = async (req, res) => {
    const { id_rol, nombre, correo, contrasena } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ 
                id_rol: id_rol || null, 
                nombre, 
                correo, 
                contrasena: contrasenaEncriptada,
                estado: true 
            }])
            .select();

        if (error) throw error;

        let nuevoUsuario = data[0];

        if (req.file) {
            try {
                const fotoUrl = await subirImagenPerfil(req.file, nuevoUsuario.idusuario);
                const { data: updateData, error: updateError } = await supabase
                    .from('usuarios')
                    .update({ foto: fotoUrl }) 
                    .eq('idusuario', nuevoUsuario.idusuario)
                    .select();

                if (!updateError && updateData) {
                    nuevoUsuario = updateData[0];
                }
            } catch (imgError) {
                console.error("Error al procesar la foto de perfil en el registro:", imgError.message);
            }
        }

        await registrarAuditoria(req, `Creó el usuario ${correo} (ID: ${nuevoUsuario.idusuario})`);

        const token = jwt.sign(
            { id_usuario: nuevoUsuario.idusuario, rol: nuevoUsuario.id_rol, correo: nuevoUsuario.correo },
            process.env.JWT_SECRET || 'FirmaSecretaSena2026',
            { expiresIn: '24h' }
        );

        res.cookie('token_sesion', token, COOKIE_OPTIONS);
        res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. ACTUALIZAR UN USUARIO (PUT)
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { id_rol, nombre, correo, contrasena, estado } = req.body;
    
    try {
        const datosActualizados = { nombre, correo, id_rol, estado };
        
        if (req.file) {
            const fotoUrl = await subirImagenPerfil(req.file, id);
            datosActualizados.foto = fotoUrl; 
        }

        if (contrasena) {
            const salt = await bcrypt.genSalt(10);
            datosActualizados.contrasena = await bcrypt.hash(contrasena, salt);
        }

        const { data, error } = await supabase
            .from('usuarios')
            .update(datosActualizados)
            .eq('idusuario', id)
            .select();

        if (error) throw error;

        const estadoTexto = estado !== undefined ? (estado ? 'Activo' : 'Inactivo') : '';
        await registrarAuditoria(req, `Actualizó al usuario ID ${id} (${correo}). ${estadoTexto ? 'Estado: ' + estadoTexto : ''}`);

        res.status(200).json({ message: 'Usuario actualizado con éxito', usuario: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. DESACTIVAR UN USUARIO (BORRADO LÓGICO)
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .update({ estado: false })
            .eq('idusuario', id)
            .select();

        if (error) throw error;

        const usuarioAfectado = data[0];
        await registrarAuditoria(req, `Desactivó al usuario ID ${id} (${usuarioAfectado?.correo || ''})`);

        res.status(200).json({ message: 'Usuario desactivado correctamente', usuario: usuarioAfectado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6. CONTROLADOR DE LOGIN (POST)
export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('correo', correo)
            .single();

        if (error || !usuario) {
            return res.status(404).json({ status: 'error', message: 'El correo no está registrado o el usuario no existe.' });
        }

        if (usuario.estado === false) {
            return res.status(403).json({ status: 'error', message: 'Este usuario ha sido desactivado del sistema.' });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        
        if (!contrasenaValida) {
            return res.status(401).json({ status: 'error', message: 'Contraseña incorrecta. Inténtalo de nuevo.' });
        }

        const token = jwt.sign(
            { id_usuario: usuario.idusuario, rol: usuario.id_rol, correo: usuario.correo },
            process.env.JWT_SECRET || 'FirmaSecretaSena2026',
            { expiresIn: '24h' }
        );

        res.cookie('token_sesion', token, COOKIE_OPTIONS);

        return res.status(200).json({
            status: 'success',
            message: `¡Bienvenido al sistema, ${usuario.nombre}!`,
            usuario
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

// 7. ACTUALIZAR MI PROPIO PERFIL (PUT)
export const updatePerfil = async (req, res) => {
    const id_usuario = req.usuario?.id_usuario || req.usuario?.id;

    if (!id_usuario) {
        return res.status(401).json({ status: 'error', message: 'No autorizado: ID de usuario no encontrado en el token.' });
    }

    if (!req.body) {
        return res.status(400).json({ status: 'error', message: 'No se recibieron los datos del formulario.' });
    }

    const { nombre, apellidos, correo, telefono, passwordActual, passwordNueva } = req.body;

    try {
        const datosPerfilActualizado = { nombre, apellidos, correo, telefono };

        if (passwordActual && passwordNueva) {
            const { data: usuarioBD, error: errorUser } = await supabase
                .from('usuarios')
                .select('contrasena')
                .eq('idusuario', id_usuario)
                .single();

            if (errorUser || !usuarioBD) {
                return res.status(404).json({ status: 'error', message: 'Usuario no encontrado en la base de datos.' });
            }

            const passwordValida = await bcrypt.compare(passwordActual, usuarioBD.contrasena);
            if (!passwordValida) {
                return res.status(400).json({ status: 'error', message: 'La contraseña actual es incorrecta.' });
            }

            const salt = await bcrypt.genSalt(10);
            datosPerfilActualizado.contrasena = await bcrypt.hash(passwordNueva, salt);
        }

        if (req.file) {
            const fotoUrl = await subirImagenPerfil(req.file, id_usuario);
            datosPerfilActualizado.foto = fotoUrl; 
        }

        const { data, error } = await supabase
            .from('usuarios')
            .update(datosPerfilActualizado)
            .eq('idusuario', id_usuario)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ status: 'error', message: error.message });
        }

        await registrarAuditoria(req, `Actualizó su propio perfil (ID: ${id_usuario})`);

        res.status(200).json({
            status: 'success',
            message: 'Perfil actualizado correctamente',
            usuario: data
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// 8. RECUPERAR CONTRASEÑA - ENVIAR TOKEN
export const recuperarPassword = async (req, res) => {
    const { correo } = req.body;

    try {
        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('correo', correo)
            .single();

        if (error || !usuario) {
            return res.status(404).json({ status: 'error', message: 'No se encontró una cuenta con este correo.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiracion = new Date(Date.now() + 3600000); // 1 hora

        await supabase
            .from('usuarios')
            .update({ 
                token_recuperacion: token, 
                token_expiracion: expiracion.toISOString() 
            })
            .eq('idusuario', usuario.idusuario);

        const enlace = `http://localhost:5173/actualizar-password?token=${token}`;
        console.log("🔗 ENLACE DE RECUPERACIÓN:", enlace);

        res.json({ 
            status: 'success', 
            mensaje: 'Se han generado las instrucciones de recuperación.' 
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

// 9. ACTUALIZAR CONTRASEÑA USANDO EL TOKEN
export const actualizarPassword = async (req, res) => {
    const { token, nuevaPassword } = req.body;

    try {
        if (!token || !nuevaPassword) {
            return res.status(400).json({ status: 'error', message: 'Faltan datos requeridos.' });
        }

        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('token_recuperacion', token)
            .gt('token_expiracion', new Date().toISOString())
            .single();

        if (error || !usuario) {
            return res.status(400).json({ status: 'error', message: 'El enlace es inválido o ya ha expirado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(nuevaPassword, salt);

        await supabase
            .from('usuarios')
            .update({ 
                contrasena: passwordEncriptada, 
                token_recuperacion: null, 
                token_expiracion: null 
            })
            .eq('idusuario', usuario.idusuario);

        res.json({ 
            status: 'success', 
            message: '¡Contraseña actualizada con éxito!' 
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};