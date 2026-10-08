import { Router } from 'express';
import { 
    getProductos, 
    getProductoById, 
    createProducto, 
    updateProducto, 
    deleteProducto 
} from '../controllers/producto.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // 1. Importamos el guardián

const router = Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos (Requiere Autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *       401:
 *         description: No autorizado.
 */
router.get('/productos', verificarToken, getProductos);      // 2. Protegido 🔒

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID (Requiere Autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado con éxito.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Producto no encontrado.
 */
router.get('/productos/:id', verificarToken, getProductoById); // 2. Protegido 🔒

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto (Requiere Autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idcategoria:
 *                 type: integer
 *               nombre_producto:
 *                 type: string
 *               precio:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               caracteristicas:
 *                 type: string
 *               imagenes:
 *                 type: string
 *               stock:
 *                 type: integer
 *             example:
 *               idcategoria: 1
 *               nombre_producto: "Laptop Gamer"
 *               precio: 3500000
 *               descripcion: "Laptop de alta gama para diseño y juegos"
 *               caracteristicas: "16GB RAM, SSD 512GB"
 *               imagenes: "url_imagen.jpg"
 *               stock: 10
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/productos', verificarToken, createProducto);    // 2. Protegido 🔒

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto (Requiere Autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idcategoria:
 *                 type: integer
 *               nombre_producto:
 *                 type: string
 *               precio:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               caracteristicas:
 *                 type: string
 *               imagenes:
 *                 type: string
 *               stock:
 *                 type: integer
 *             example:
 *               idcategoria: 1
 *               nombre_producto: "Laptop Gamer Actualizada"
 *               precio: 3700000
 *               descripcion: "Laptop de alta gama actualizada"
 *               caracteristicas: "32GB RAM, SSD 1TB"
 *               imagenes: "url_imagen.jpg"
 *               stock: 8
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/productos/:id', verificarToken, updateProducto);   // 2. Protegido 🔒

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID (Requiere Autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/productos/:id', verificarToken, deleteProducto); // 2. Protegido 🔒

export default router;