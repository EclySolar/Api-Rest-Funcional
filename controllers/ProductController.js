const productModel = require("../models/productModel");

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
 * Lista todos os produtos.
 */
exports.getProducts = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const products = await productModel.findAll();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Busca um produto por ID.
 */
exports.getProductById = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Cria um novo produto.
 */
exports.createProduct = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const {
      nome,
      valor,
      estoque,
      categorias_id_categoria
    } = req.body;

    if (!nome || !valor || !estoque || !categorias_id_categoria) {
      return res.status(400).json({
        error: "Nome, valor, estoque e categorias_id_categoria são obrigatórios"
      });
    }

    const result = await productModel.create(
      nome,
      valor,
      estoque,
      categorias_id_categoria
    );

    return res.status(201).json({
      message: "Produto criado com sucesso",
      id_produto: result.insertId,
      nome,
      valor,
      estoque,
      categorias_id_categoria
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Atualiza um produto.
 */
exports.updateProduct = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const {
      nome,
      valor,
      estoque,
      categorias_id_categoria
    } = req.body;

    if (!nome || !valor || !estoque || !categorias_id_categoria) {
      return res.status(400).json({
        error: "Nome, valor, estoque e categorias_id_categoria são obrigatórios"
      });
    }

    const result = await productModel.update(
      req.params.id,
      nome,
      valor,
      estoque,
      categorias_id_categoria
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json({
      message: "Produto atualizado com sucesso"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Remove um produto.
 */
exports.deleteProduct = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const result = await productModel.delete(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json({
      message: "Produto removido com sucesso"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};