const express = require("express");
const router = express.Router();

const {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
} = require("../controllers/categoriaController");

/**
 * @swagger
 * tags:
 *   - name: Categorias
 *     description: CRUD de categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     parameters:
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       403:
 *         description: Acesso negado
 */
router.get("/", listar);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", buscarPorId);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Periféricos
 */
router.post("/", criar);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", atualizar);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: id-usuario
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/:id", excluir);

module.exports = router;