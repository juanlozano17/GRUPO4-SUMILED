import { Router } from 'express';
import {
    getProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
} from '../controllers/proveedores.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     summary: Obtiene todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida con éxito.
 */
router.get('/proveedores', getProveedores);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   get:
 *     summary: Obtiene un proveedor por su ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado con éxito.
 *       404:
 *         description: Proveedor no encontrado.
 */
router.get('/proveedores/:id', getProveedorById);

/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     summary: Crea un nuevo proveedor (Requiere Autenticación)
 *     tags: [Proveedores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_proveedor:
 *                 type: string
 *               contacto:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *             example:
 *               nombre_proveedor: "Distribuciones S.A.S."
 *               contacto: "Carlos Pérez"
 *               correo: "contacto@distribuciones.com"
 *               telefono: "3001234567"
 *     responses:
 *       201:
 *         description: Proveedor creado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/proveedores', verificarToken, createProveedor);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   put:
 *     summary: Actualiza un proveedor (Requiere Autenticación)
 *     tags: [Proveedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_proveedor:
 *                 type: string
 *               contacto:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *             example:
 *               nombre_proveedor: "Distribuciones Actualizadas S.A.S."
 *               contacto: "Carlos Pérez"
 *               correo: "ventas@distribuciones.com"
 *               telefono: "3007654321"
 *     responses:
 *       200:
 *         description: Proveedor actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/proveedores/:id', verificarToken, updateProveedor);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   delete:
 *     summary: Elimina un proveedor (Requiere Autenticación)
 *     tags: [Proveedores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a eliminar
 *     responses:
 *       200:
 *         description: Proveedor eliminado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/proveedores/:id', verificarToken, deleteProveedor);

export default router;