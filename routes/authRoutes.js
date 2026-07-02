const express = require("express");
const router = express.Router();

const {
  login,
  logout
} = require("../controllers/authController");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nick:
 *                 type: string
 *                 example: candido
 *               senha:
 *                 type: string
 *                 example: sua_senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Faz logout do usuário
 *     tags:
 *       - Autenticação
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.get("/logout", logout);

module.exports = router;