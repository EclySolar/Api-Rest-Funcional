const express = require("express");
const router = express.Router();

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} = require("../controllers/clientController");

/**
 * @swagger
 * tags:
 *   - name: Clientes
 *     description: CRUD privado de clientes
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *       403:
 *         description: Acesso negado
 */
router.get("/", getClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 *       403:
 *         description: Acesso negado
 */
router.get("/:id", getClientById);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               telefone:
 *                 type: string
 *                 example: "51999998888"
 *               status:
 *                 type: string
 *                 enum: [bom, medio, ruim]
 *                 example: medio
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Acesso negado
 */
router.post("/", createClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - telefone
 *               - status
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               telefone:
 *                 type: string
 *                 example: "51999998888"
 *               status:
 *                 type: string
 *                 enum: [bom, medio, ruim]
 *                 example: bom
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       403:
 *         description: Acesso negado
 */
router.put("/:id", updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Remove um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       403:
 *         description: Acesso negado
 */
router.delete("/:id", deleteClient);

module.exports = router;