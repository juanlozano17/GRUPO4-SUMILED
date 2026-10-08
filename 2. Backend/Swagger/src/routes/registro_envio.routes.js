import { Router } from 'express';
import {
    getRegistrosEnvio,
    getRegistroEnvioById,
    createRegistroEnvio,
    updateRegistroEnvio,
    deleteRegistroEnvio
} from '../controllers/registro_envio.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/registro-envio:
 *   get:
 *     summary: Obtiene todos los registros de envío
 *     tags: [Registro Envío]
 *     responses:
 *       200:
 *         description: Lista de registros de envío obtenida con éxito.
 */
router.get('/registro-envio', getRegistrosEnvio);

/**
 * @swagger
 * /api/registro-envio/{id}:
 *   get:
 *     summary: Obtiene un registro de envío por su ID
 *     tags: [Registro Envío]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de envío
 *     responses:
 *       200:
 *         description: Registro de envío encontrado con éxito.
 *       404:
 *         description: Registro de envío no encontrado.
 */
router.get('/registro-envio/:id', getRegistroEnvioById);

/**
 * @swagger
 * /api/registro-envio:
 *   post:
 *     summary: Crea un nuevo registro de envío (Requiere Autenticación)
 *     tags: [Registro Envío]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idtransportadora:
 *                 type: integer
 *               numero_guia:
 *                 type: string
 *               fecha_envio:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               idventa:
 *                 type: integer
 *             example:
 *               idtransportadora: 1
 *               numero_guia: "GUIA-987654"
 *               fecha_envio: "2026-06-01"
 *               estado: "En tránsito"
 *               idventa: 2
 *     responses:
 *       201:
 *         description: Registro de envío creado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/registro-envio', verificarToken, createRegistroEnvio);

/**
 * @swagger
 * /api/registro-envio/{id}:
 *   put:
 *     summary: Actualiza un registro de envío (Requiere Autenticación)
 *     tags: [Registro Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de envío a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idtransportadora:
 *                 type: integer
 *               numero_guia:
 *                 type: string
 *               fecha_envio:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               idventa:
 *                 type: integer
 *             example:
 *               idtransportadora: 1
 *               numero_guia: "GUIA-987654"
 *               fecha_envio: "2026-06-01"
 *               estado: "Entregado"
 *               idventa: 2
 *     responses:
 *       200:
 *         description: Registro de envío actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/registro-envio/:id', verificarToken, updateRegistroEnvio);

/**
 * @swagger
 * /api/registro-envio/{id}:
 *   delete:
 *     summary: Elimina un registro de envío (Requiere Autenticación)
 *     tags: [Registro Envío]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de envío a eliminar
 *     responses:
 *       200:
 *         description: Registro de envío eliminado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/registro-envio/:id', verificarToken, deleteRegistroEnvio);

export default router;