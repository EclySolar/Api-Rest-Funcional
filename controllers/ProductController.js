const Product = require("../models/Product");

/**
 * Converte um valor monetário para centavos.
 *
 * @param {string|number} value Valor informado pelo usuário.
 * Pode ser uma string utilizando vírgula decimal ou um número.
 *
 * @returns {number} Valor convertido para centavos.
 */
function parsePrice(value) {
  if (typeof value === "string") {
    return Math.round(Number(value.replace(",", ".")) * 100);
  }

  return Math.round(Number(value) * 100);
}

/**
 * Cria um novo produto no banco de dados.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * Espera um corpo JSON contendo "name" e "price".
 *
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Retorna o produto criado ou uma mensagem de erro.
 */
exports.createProduct = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const { name, price } = req.body;

    const product = await Product.create({
      name,
      price: parsePrice(price),
      order: count
    });

    return res.status(201).json(product);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Retorna todos os produtos cadastrados.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Envia um array de produtos em formato JSON.
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Busca um produto pelo seu identificador.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * Espera um parâmetro de rota chamado "id".
 *
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Retorna o produto encontrado ou um erro 404.
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    return res.status(200).json(product);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Atualiza os dados de um produto existente.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * Espera um parâmetro "id" e um corpo JSON com "name" e "price".
 *
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Retorna o produto atualizado ou um erro.
 */
exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price: parsePrice(price)
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    return res.status(200).json(updatedProduct);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Remove um produto do banco de dados.
 *
 * @async
 * @param {import('express').Request} req Objeto de requisição do Express.
 * Espera um parâmetro de rota chamado "id".
 *
 * @param {import('express').Response} res Objeto de resposta do Express.
 *
 * @returns {Promise<void>} Retorna status 204 em caso de sucesso.
 */
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    return res.sendStatus(204);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};