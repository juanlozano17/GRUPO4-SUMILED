import { Router } from 'express';
import { getDeseosUsuario, addDeseo, deleteDeseo } from '../controllers/deseos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/deseos:
 *   get:
 *     summary: Obtiene la lista de deseos del usuario autenticado
 *     tags: [Deseos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de deseos obtenida con éxito.
 *       401:
 *         description: No autorizado.
 */
router.get('/deseos', verificarToken, getDeseosUsuario);

/**
 * @swagger
 * /api/deseos:
 *   post:
 *     summary: Agrega un producto a la lista de deseos
 *     tags: [Deseos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: integer
 *             example:
 *               id_producto: 5
 *     responses:
 *       201:
 *         description: Producto agregado a favoritos con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/deseos', verificarToken, addDeseo);

/**
 * @swagger
 * /api/deseos/{id}:
 *   delete:
 *     summary: Elimina un producto de la lista de deseos por su id_deseo
 *     tags: [Deseos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del deseo a eliminar
 *     responses:
 *       200:
 *         description: Eliminado de favoritos correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/deseos/:id', verificarToken, deleteDeseo);

export default router;