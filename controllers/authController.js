const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * Registra um novo usuário no sistema.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * Espera um corpo JSON contendo "email" e "password".
 *
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Redireciona para a tela de login ou retorna um erro.
 */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Um ou mais campos estão vazios");
    }

    if (password.length < 8) {
      return res.send("A senha deve ter no mínimo 8 caracteres");
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hash
    });

    res.redirect("/login");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Autentica um usuário e cria uma sessão no servidor.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * Espera um corpo JSON contendo "email" e "password".
 *
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Cria uma sessão válida ou retorna uma mensagem de erro.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Um ou mais campos estão vazios");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Usuário não encontrado");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.send("Senha inválida");
    }

    req.session.user = {
      id: user._id,
      email: user.email
    };

    return res.redirect("/dashboard");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Encerra a sessão do usuário autenticado.
 *
 * @param {import('express').Request} req Objeto de requisição do Express.
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {void} Remove a sessão e redireciona para a página de login.
 */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Erro ao sair");
    }

    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
};