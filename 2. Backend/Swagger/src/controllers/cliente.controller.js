import { supabase } from '../supabase.js';

// 1. Obtener todos los clientes (GET)
export const getClientes = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cliente')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar cliente por ID (GET)
export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('cliente')
            .select('*')
            .eq('idcliente', id)
            .single();

        if (error || !data) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Registrar nuevo cliente (POST)
export const createCliente = async (req, res) => {
    try {
        const { 
            idusuario = 1, 
            direccion = "Cra 15 # 90-20 Bogotá", 
            nombre = "Lionel", 
            apellido = "Messi", 
            telefono = "3001234556", 
            email = "lionelmessi@gmail.com" 
        } = req.body; 

        const { data, error } = await supabase
            .from('cliente')
            .insert([{ idusuario, direccion, nombre, apellido, telefono, email }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Cliente creado exitosamente en Supabase', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar cliente (PUT)
export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { idusuario, direccion, nombre, apellido, telefono, email } = req.body;

        const { data, error } = await supabase
            .from('cliente')
            .update({ idusuario, direccion, nombre, apellido, telefono, email })
            .eq('idcliente', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Cliente actualizado correctamente', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar cliente (DELETE)
export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('cliente')
            .delete()
            .eq('idcliente', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Cliente eliminado correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};