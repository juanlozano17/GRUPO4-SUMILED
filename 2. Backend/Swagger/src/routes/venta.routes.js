import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {
    getVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
} from '../controllers/venta.controller.js';

const router = Router();

/**
 * @swagger
 * /api/ventas:
 *   get:
 *     summary: Obtiene todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente desde Supabase.
 *       500:
 *         description: Error del servidor.
 */
router.get('/ventas', getVentas);

/**
 * @swagger
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtiene una venta por su ID
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta encontrada exitosamente.
 *       404:
 *         description: Venta no encontrada.
 *       500:
 *         description: Error del servidor.
 */
router.get('/ventas/:id', getVentaById);

/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Crea una nueva venta (Requiere Autenticación)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente
 *               - correo
 *               - telefono
 *               - direccion
 *               - total
 *               - estado
 *               - fecha_pedido
 *               - metodo_pago
 *             properties:
 *               cliente:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               total:
 *                 type: number
 *               estado:
 *                 type: string
 *               fecha_pedido:
 *                 type: string
 *                 format: date-time
 *               metodo_pago:
 *                 type: string
 *             example:
 *               cliente: "Lionel Messi"
 *               correo: "lionelmessi@gmail.com"
 *               telefono: "3001234556"
 *               direccion: "Camp Nou - #30-54 (Barcelona)"
 *               total: 149900
 *               estado: "enviado"
 *               fecha_pedido: "2026-09-22T07:40:44.862Z"
 *               metodo_pago: "Efectivo"
 *     responses:
 *       201:
 *         description: Venta creada exitosamente en Supabase.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.post('/ventas', verificarToken, createVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   put:
 *     summary: Actualiza una venta existente (Requiere Autenticación)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               total:
 *                 type: number
 *               estado:
 *                 type: string
 *               fecha_pedido:
 *                 type: string
 *                 format: date-time
 *               metodo_pago:
 *                 type: string
 *             example:
 *               cliente: "Lionel Messi"
 *               correo: "lionelmessi@gmail.com"
 *               telefono: "3001234556"
 *               direccion: "Camp Nou - #30-54 (Barcelona)"
 *               total: 149900
 *               estado: "enviado"
 *               fecha_pedido: "2026-09-22T07:40:44.862Z"
 *               metodo_pago: "Efectivo"
 *     responses:
 *       200:
 *         description: Venta actualizada correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.put('/ventas/:id', verificarToken, updateVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   delete:
 *     summary: Elimina una venta (Solo Administrador)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.delete('/ventas/:id', verificarToken, deleteVenta);

export default router;