import { Router } from 'express';
import { getAuditoria } from '../controllers/auditoria.controller.js';
// Nota: Ya NO importamos 'verificarToken' porque será una ruta pública

const router = Router();

/**
 * @swagger
 * /api/auditoria:
 *   get:
 *     summary: Obtiene todos los registros de auditoría
 *     tags: [Auditoría]
 *     responses:
 *       200:
 *         description: Registros de auditoría obtenidos con éxito.
 *       500:
 *         description: Error del servidor.
 */
router.get('/auditoria', getAuditoria); // Sin 'verificarToken'

export default router;