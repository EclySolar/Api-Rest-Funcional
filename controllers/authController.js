const crypto = require("crypto");
const usuarioModel = require("../models/usuarioModel");

/**
 * Autentica um usuário usando a tabela usuarios do MySQL.
 *
 * @async
 * @param {import('express').Request} req Requisição do Express.
 * Espera no body os campos "nick" e "senha".
 *
 * @param {import('express').Response} res Resposta do Express.
 *
 * @returns {Promise<void>} Cria uma sessão válida ou retorna erro.
 */
exports.login = async (req, res) => {
  try {
    const { nick, senha } = req.body;

    if (!nick || !senha) {
      return res.status(400).json({
        error: "Nick e senha são obrigatórios"
      });
    }

    const usuario = await usuarioModel.buscarPorNick(nick);

    if (!usuario) {
      return res.status(401).json({
        error: "Usuário não encontrado"
      });
    }

    const senhaCriptografada = crypto
      .createHash("md5")
      .update(senha)
      .digest("hex");

    if (senhaCriptografada !== usuario.senha) {
      return res.status(401).json({
        error: "Senha inválida"
      });
    }

    req.session.user = {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      nick: usuario.nick
    };

    return res.status(200).json({
      message: "Login realizado com sucesso",
      usuario: req.session.user
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Encerra a sessão do usuário autenticado.
 *
 * @param {import('express').Request} req Requisição do Express.
 * @param {import('express').Response} res Resposta do Express.
 *
 * @returns {void} Remove a sessão e retorna confirmação.
 */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: "Erro ao sair"
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logout realizado com sucesso"
    });
  });
};