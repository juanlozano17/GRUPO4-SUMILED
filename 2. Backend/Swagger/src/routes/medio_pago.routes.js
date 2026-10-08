import { Router } from 'express';
import {
    getMediosPago,
    getMedioPagoById,
    createMedioPago,
    updateMedioPago,
    deleteMedioPago
} from '../controllers/medio_pago.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/medios-pago:
 *   get:
 *     summary: Obtiene todos los medios de pago
 *     tags: [Medios de Pago]
 *     responses:
 *       200:
 *         description: Lista de medios de pago obtenida con éxito.
 */
router.get('/medios-pago', getMediosPago);

/**
 * @swagger
 * /api/medios-pago/{id}:
 *   get:
 *     summary: Obtiene un medio de pago por su ID
 *     tags: [Medios de Pago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medio de pago
 *     responses:
 *       200:
 *         description: Medio de pago encontrado.
 *       404:
 *         description: Medio de pago no encontrado.
 */
router.get('/medios-pago/:id', getMedioPagoById);

/**
 * @swagger
 * /api/medios-pago:
 *   post:
 *     summary: Crea un nuevo medio de pago (Requiere Autenticación)
 *     tags: [Medios de Pago]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo_med:
 *                 type: string
 *             example:
 *               nombre: "Tarjeta de Crédito"
 *               tipo_med: "Digital"
 *     responses:
 *       201:
 *         description: Medio de pago creado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/medios-pago', verificarToken, createMedioPago);

/**
 * @swagger
 * /api/medios-pago/{id}:
 *   put:
 *     summary: Actualiza un medio de pago (Requiere Autenticación)
 *     tags: [Medios de Pago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medio de pago a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo_med:
 *                 type: string
 *             example:
 *               nombre: "Tarjeta Débito"
 *               tipo_med: "Digital"
 *     responses:
 *       200:
 *         description: Medio de pago actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/medios-pago/:id', verificarToken, updateMedioPago);

/**
 * @swagger
 * /api/medios-pago/{id}:
 *   delete:
 *     summary: Elimina un medio de pago (Requiere Autenticación)
 *     tags: [Medios de Pago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medio de pago a eliminar
 *     responses:
 *       200:
 *         description: Medio de pago eliminado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/medios-pago/:id', verificarToken, deleteMedioPago);

export default router;