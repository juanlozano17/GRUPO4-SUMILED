import { Router } from 'express';
import { 
    getDetallesEnvio, 
    getDetalleEnvioById, 
    createDetalleEnvio, 
    updateDetalleEnvio 
} from '../controllers/detalle_envio.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // El escudo 🔒

const router = Router();

/**
 * @swagger
 * /api/detalle-envio:
 *   get:
 *     summary: Obtiene todos los detalles de envío
 *     tags: [Detalle Envio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de detalles de envío obtenida con éxito.
 *       401:
 *         description: No autorizado.
 */
router.get('/detalle-envio', verificarToken, getDetallesEnvio);

/**
 * @swagger
 * /api/detalle-envio/{id}:
 *   get:
 *     summary: Obtiene un detalle de envío por su ID
 *     tags: [Detalle Envio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de envío
 *     responses:
 *       200:
 *         description: Detalle de envío encontrado con éxito.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Detalle de envío no encontrado.
 */
router.get('/detalle-envio/:id', verificarToken, getDetalleEnvioById);

/**
 * @swagger
 * /api/detalle-envio:
 *   post:
 *     summary: Crea un nuevo detalle de envío
 *     tags: [Detalle Envio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idenvio:
 *                 type: integer
 *               calle:
 *                 type: string
 *               ciudad:
 *                 type: string
 *               codigo_postal:
 *                 type: string
 *               estado:
 *                 type: string
 *             example:
 *               idenvio: 1
 *               calle: "Calle 100 # 15-20"
 *               ciudad: "Bogotá"
 *               codigo_postal: "110111"
 *               estado: "en proceso"
 *     responses:
 *       201:
 *         description: Detalle de envío registrado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/detalle-envio', verificarToken, createDetalleEnvio);

/**
 * @swagger
 * /api/detalle-envio/{id}:
 *   put:
 *     summary: Actualiza la dirección o estado de un envío
 *     tags: [Detalle Envio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de envío a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calle:
 *                 type: string
 *               ciudad:
 *                 type: string
 *               codigo_postal:
 *                 type: string
 *               estado:
 *                 type: string
 *             example:
 *               calle: "Calle 100 # 15-20"
 *               ciudad: "Bogotá"
 *               codigo_postal: "110111"
 *               estado: "en camino"
 *     responses:
 *       200:
 *         description: Dirección o estado de envío actualizado.
 *       401:
 *         description: No autorizado.
 */
router.put('/detalle-envio/:id', verificarToken, updateDetalleEnvio);

export default router;