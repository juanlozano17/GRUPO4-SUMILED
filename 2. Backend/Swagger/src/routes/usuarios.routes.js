import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuarioById, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario,
    loginUsuario,
    updatePerfil,
    recuperarPassword,     
    actualizarPassword
} from '../controllers/usuarios.controller.js';

import { verificarToken } from '../middlewares/auth.middleware.js';
import upload from '../helpers/upload.helper.js';

const router = Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios (Requiere Autenticación)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       401:
 *         description: No autorizado.
 */
router.get('/usuarios', verificarToken, getUsuarios);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   put:
 *     summary: Actualiza el perfil del usuario logueado (Requiere Autenticación)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               passwordActual:
 *                 type: string
 *               passwordNueva:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/usuarios/perfil', verificarToken, upload.single('foto'), updatePerfil);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID (Requiere Autenticación)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/usuarios/:id', verificarToken, getUsuarioById);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema (Público)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_rol:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 */
router.post('/usuarios', upload.single('foto'), createUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Inicia sesión de usuario (Público)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *             example:
 *               correo: "admin@correo.com"
 *               contrasena: "123456"
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post('/usuarios/login', loginUsuario); 

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID (Requiere Autenticación)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_rol:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               estado:
 *                 type: boolean
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.put('/usuarios/:id', verificarToken, upload.single('foto'), updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Desactiva un usuario por ID - Borrado lógico (Requiere Autenticación)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a desactivar
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/usuarios/:id', verificarToken, deleteUsuario);

/**
 * @swagger
 * /api/usuarios/recuperar-password:
 *   post:
 *     summary: Solicita el token de recuperación de contraseña (Público)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *             example:
 *               correo: "usuario@correo.com"
 *     responses:
 *       200:
 *         description: Instrucciones de recuperación generadas.
 */
router.post('/usuarios/recuperar-password', recuperarPassword);

/**
 * @swagger
 * /api/usuarios/actualizar-password:
 *   post:
 *     summary: Actualiza la contraseña mediante el token recibido (Público)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               nuevaPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada con éxito.
 */
router.post('/usuarios/actualizar-password', actualizarPassword);

export default router;