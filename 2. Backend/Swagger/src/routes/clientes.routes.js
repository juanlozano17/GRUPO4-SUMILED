import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { 
    getClientes, 
    getClienteById, 
    createCliente, 
    updateCliente, 
    deleteCliente 
} from '../controllers/cliente.controller.js';

const router = Router();

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente desde Supabase.
 *       500:
 *         description: Error del servidor.
 */
router.get('/clientes', getClientes);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/clientes/:id', getClienteById);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente (Requiere Autenticación)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: integer
 *               direccion:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               idusuario: 1
 *               direccion: "Camp Nou - #30-54 (Barcelona)"
 *               nombre: "Lionel"
 *               apellido: "Messi"
 *               telefono: "3001234556"
 *               email: "lionelmessi@gmail.com"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente en Supabase.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.post('/clientes', verificarToken, createCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente existente (Requiere Autenticación)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: integer
 *               direccion:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               idusuario: 1
 *               direccion: "Camp Nou - #30-54 (Barcelona)"
 *               nombre: "Lionel"
 *               apellido: "Messi"
 *               telefono: "3001234556"
 *               email: "lionelmessi@gmail.com"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.put('/clientes/:id', verificarToken, updateCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente (Solo Administrador)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.delete('/clientes/:id', verificarToken, deleteCliente);

export default router;