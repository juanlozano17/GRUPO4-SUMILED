import { Router } from 'express';
import { getRoles, createRol, updateRol, deleteRol } from '../controllers/roles.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles (Requiere Autenticación)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles obtenida con éxito.
 *       401:
 *         description: No autorizado.
 */
router.get('/roles', verificarToken, getRoles);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un nuevo rol (Requiere Autenticación)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *             example:
 *               nombre_rol: "Administrador"
 *     responses:
 *       201:
 *         description: Rol creado con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/roles', verificarToken, createRol);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualiza un rol (Requiere Autenticación)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *             example:
 *               nombre_rol: "Super Administrador"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/roles/:id', verificarToken, updateRol);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Elimina un rol (Requiere Autenticación)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/roles/:id', verificarToken, deleteRol);

export default router;