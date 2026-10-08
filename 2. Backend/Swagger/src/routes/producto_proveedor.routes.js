import { Router } from 'express';
import { 
    getProductosProveedores, 
    getProductoProveedorById,
    createProductoProveedor,
    updateProductoProveedor,
    deleteProductoProveedor
} from '../controllers/producto_proveedor.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // Tu escudo 🔒

const router = Router();

/**
 * @swagger
 * /api/producto-proveedor:
 *   get:
 *     summary: Obtiene todas las asociaciones entre productos y proveedores (Requiere Autenticación)
 *     tags: [Producto Proveedor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asociaciones obtenida con éxito.
 *       401:
 *         description: No autorizado.
 */
router.get('/producto-proveedor', verificarToken, getProductosProveedores);

/**
 * @swagger
 * /api/producto-proveedor/{id}:
 *   get:
 *     summary: Obtiene una relación producto-proveedor por su ID (Requiere Autenticación)
 *     tags: [Producto Proveedor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación producto-proveedor
 *     responses:
 *       200:
 *         description: Relación encontrada con éxito.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Relación no encontrada.
 */
router.get('/producto-proveedor/:id', verificarToken, getProductoProveedorById);

/**
 * @swagger
 * /api/producto-proveedor:
 *   post:
 *     summary: Asocia un producto a un proveedor (Requiere Autenticación)
 *     tags: [Producto Proveedor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idproducto:
 *                 type: integer
 *               idproveedor:
 *                 type: integer
 *               precio_compra_actual:
 *                 type: number
 *             example:
 *               idproducto: 1
 *               idproveedor: 2
 *               precio_compra_actual: 45000.00
 *     responses:
 *       201:
 *         description: Asociación registrada con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/producto-proveedor', verificarToken, createProductoProveedor);

/**
 * @swagger
 * /api/producto-proveedor/{id}:
 *   put:
 *     summary: Actualiza una relación producto-proveedor (Requiere Autenticación)
 *     tags: [Producto Proveedor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idproducto:
 *                 type: integer
 *               idproveedor:
 *                 type: integer
 *               precio_compra_actual:
 *                 type: number
 *             example:
 *               idproducto: 1
 *               idproveedor: 2
 *               precio_compra_actual: 48000.00
 *     responses:
 *       200:
 *         description: Relación actualizada con éxito.
 *       401:
 *         description: No autorizado.
 */
router.put('/producto-proveedor/:id', verificarToken, updateProductoProveedor);

/**
 * @swagger
 * /api/producto-proveedor/{id}:
 *   delete:
 *     summary: Elimina una relación producto-proveedor por su ID (Requiere Autenticación)
 *     tags: [Producto Proveedor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación a eliminar
 *     responses:
 *       200:
 *         description: Relación eliminada correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/producto-proveedor/:id', verificarToken, deleteProductoProveedor);

export default router;