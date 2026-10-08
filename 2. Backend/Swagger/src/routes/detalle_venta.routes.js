import { Router } from 'express';
import {
    getDetallesVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} from '../controllers/detalle_venta.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/detalles-venta:
 *   get:
 *     summary: Obtiene todos los detalles de venta
 *     tags: [Detalles Venta]
 *     responses:
 *       200:
 *         description: Lista de detalles de venta obtenida con éxito.
 */
router.get('/detalles-venta', getDetallesVenta);

/**
 * @swagger
 * /api/detalles-venta/{id}:
 *   get:
 *     summary: Obtiene un detalle de venta por su ID
 *     tags: [Detalles Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Detalle de venta encontrado.
 *       404:
 *         description: Detalle de venta no encontrado.
 */
router.get('/detalles-venta/:id', getDetalleVentaById);

/**
 * @swagger
 * /api/detalles-venta:
 *   post:
 *     summary: Crea un nuevo detalle de venta (Requiere Autenticación)
 *     tags: [Detalles Venta]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idventa:
 *                 type: integer
 *               idproducto:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *               precio_unitario:
 *                 type: number
 *               subtotal:
 *                 type: number
 *             example:
 *               idventa: 1
 *               idproducto: 2
 *               cantidad: 3
 *               precio_unitario: 50000
 *               subtotal: 150000
 *     responses:
 *       201:
 *         description: Detalle de venta creado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/detalles-venta', verificarToken, createDetalleVenta);

/**
 * @swagger
 * /api/detalles-venta/{id}:
 *   put:
 *     summary: Actualiza un detalle de venta (Requiere Autenticación)
 *     tags: [Detalles Venta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idventa:
 *                 type: integer
 *               idproducto:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *               precio_unitario:
 *                 type: number
 *               subtotal:
 *                 type: number
 *             example:
 *               idventa: 1
 *               idproducto: 2
 *               cantidad: 3
 *               precio_unitario: 50000
 *               subtotal: 150000
 *     responses:
 *       200:
 *         description: Detalle de venta actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/detalles-venta/:id', verificarToken, updateDetalleVenta);

/**
 * @swagger
 * /api/detalles-venta/{id}:
 *   delete:
 *     summary: Elimina un detalle de venta (Requiere Autenticación)
 *     tags: [Detalles Venta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta a eliminar
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/detalles-venta/:id', verificarToken, deleteDetalleVenta);

export default router;