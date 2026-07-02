const categoriaModel = require("../models/categoriaModel");

/**
 * Valida se existe usuário autenticado e ID de usuário na requisição.
 *
 * @param {import('express').Request} req Requisição do Express.
 * @returns {boolean}
 */
function validarAcesso(req) {
  const idUsuarioHeader = Number(req.headers["id-usuario"]);

  return req.session.user && idUsuarioHeader === req.session.user.id_usuario;
}

/**
 * Lista todas as categorias.
 */
exports.listar = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const categorias = await categoriaModel.listar();
    return res.status(200).json(categorias);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Busca uma categoria pelo ID.
 */
exports.buscarPorId = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const categoria = await categoriaModel.buscarPorId(req.params.id);

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json(categoria);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Cria uma nova categoria.
 */
exports.criar = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const result = await categoriaModel.criar(nome);

    return res.status(201).json({
      message: "Categoria criada com sucesso",
      id_categoria: result.insertId,
      nome
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Atualiza uma categoria.
 */
exports.atualizar = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const result = await categoriaModel.atualizar(req.params.id, nome);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json({
      message: "Categoria atualizada com sucesso"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Exclui uma categoria.
 */
exports.excluir = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const result = await categoriaModel.excluir(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json({
      message: "Categoria excluída com sucesso"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};