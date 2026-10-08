import { Router } from 'express';
import {
    getTransportadoras,
    getTransportadoraById,
    createTransportadora,
    updateTransportadora,
    deleteTransportadora
} from '../controllers/transportadora.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/transportadoras:
 *   get:
 *     summary: Obtiene todas las transportadoras
 *     tags: [Transportadoras]
 *     responses:
 *       200:
 *         description: Lista de transportadoras obtenida con éxito.
 */
router.get('/transportadoras', getTransportadoras);

/**
 * @swagger
 * /api/transportadoras/{id}:
 *   get:
 *     summary: Obtiene una transportadora por su ID
 *     tags: [Transportadoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la transportadora
 *     responses:
 *       200:
 *         description: Transportadora encontrada con éxito.
 *       404:
 *         description: Transportadora no encontrada.
 */
router.get('/transportadoras/:id', getTransportadoraById);

/**
 * @swagger
 * /api/transportadoras:
 *   post:
 *     summary: Crea una nueva transportadora (Requiere Autenticación)
 *     tags: [Transportadoras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_transportadora:
 *                 type: string
 *               telefono:
 *                 type: string
 *               pagina_web:
 *                 type: string
 *             example:
 *               nombre_transportadora: "Coordinadora"
 *               telefono: "018000520555"
 *               pagina_web: "https://www.coordinadora.com"
 *     responses:
 *       201:
 *         description: Transportadora creada con éxito.
 *       401:
 *         description: No autorizado.
 */
router.post('/transportadoras', verificarToken, createTransportadora);

/**
 * @swagger
 * /api/transportadoras/{id}:
 *   put:
 *     summary: Actualiza una transportadora (Requiere Autenticación)
 *     tags: [Transportadoras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la transportadora a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_transportadora:
 *                 type: string
 *               telefono:
 *                 type: string
 *               pagina_web:
 *                 type: string
 *             example:
 *               nombre_transportadora: "Coordinadora S.A."
 *               telefono: "018000520555"
 *               pagina_web: "https://www.coordinadora.com"
 *     responses:
 *       200:
 *         description: Transportadora actualizada correctamente.
 *       401:
 *         description: No autorizado.
 */
router.put('/transportadoras/:id', verificarToken, updateTransportadora);

/**
 * @swagger
 * /api/transportadoras/{id}:
 *   delete:
 *     summary: Elimina una transportadora (Requiere Autenticación)
 *     tags: [Transportadoras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la transportadora a eliminar
 *     responses:
 *       200:
 *         description: Transportadora eliminada correctamente.
 *       401:
 *         description: No autorizado.
 */
router.delete('/transportadoras/:id', verificarToken, deleteTransportadora);

export default router;