const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   - name: Pedidos
 *     description: CRUD privado de pedidos
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     parameters:
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       403:
 *         description: Acesso negado
 */
router.get("/", getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Busca um pedido por ID
 *     tags: [Pedidos]
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
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 *       403:
 *         description: Acesso negado
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
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
 *               - data
 *               - clientes_id_cliente
 *               - itens
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-22"
 *               clientes_id_cliente:
 *                 type: integer
 *                 example: 1
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtos_id_produto:
 *                       type: integer
 *                       example: 5
 *                     quantidade:
 *                       type: number
 *                       example: 2
 *                     valor:
 *                       type: number
 *                       example: 199.90
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Acesso negado
 */
router.post("/", createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Pedidos]
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
 *               - data
 *               - clientes_id_cliente
 *               - itens
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-22"
 *               clientes_id_cliente:
 *                 type: integer
 *                 example: 1
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtos_id_produto:
 *                       type: integer
 *                       example: 5
 *                     quantidade:
 *                       type: number
 *                       example: 2
 *                     valor:
 *                       type: number
 *                       example: 199.90
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       403:
 *         description: Acesso negado
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Pedidos]
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
 *         description: Pedido removido com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       403:
 *         description: Acesso negado
 */
router.delete("/:id", deleteOrder);

module.exports = router;