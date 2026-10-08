import { supabase } from '../supabase.js';

// Asegúrate de usar 'export const getAuditoria'
export const getAuditoria = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('auditoria') // o el nombre de tu tabla en Supabase
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};