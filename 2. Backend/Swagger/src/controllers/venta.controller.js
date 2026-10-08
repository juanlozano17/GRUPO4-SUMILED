import { supabase } from '../supabase.js';

// 1. Obtener todas las ventas (GET)
export const getVentas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('venta')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar venta por ID (GET)
export const getVentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('venta')
            .select('*')
            .eq('idventa', id)
            .single();

        if (error) return res.status(404).json({ error: 'Venta no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear una nueva venta (POST)
export const createVenta = async (req, res) => {
    try {
        const { cliente, correo, telefono, direccion, total, estado, fecha_pedido, metodo_pago } = req.body;

        const { data, error } = await supabase
            .from('venta')
            .insert([{ 
                cliente, 
                correo, 
                telefono, 
                direccion, 
                total, 
                estado, 
                fecha_pedido: fecha_pedido || new Date().toISOString(),
                metodo_pago 
            }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Venta creada exitosamente en Supabase', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar una venta (PUT)
export const updateVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { cliente, correo, telefono, direccion, total, estado, fecha_pedido, metodo_pago } = req.body;

        const { data, error } = await supabase
            .from('venta')
            .update({ cliente, correo, telefono, direccion, total, estado, fecha_pedido, metodo_pago })
            .eq('idventa', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Venta actualizada correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar una venta (DELETE)
export const deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('venta')
            .delete()
            .eq('idventa', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Venta eliminada correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};