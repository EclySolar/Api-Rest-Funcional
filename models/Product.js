const mongoose = require("mongoose");

/**
 * @class Product
 * @classdesc Representa um produto cadastrado no sistema TechWorld.
 * Armazena informações de nome, preço e posição na listagem.
 */
const ProductSchema = new mongoose.Schema({

  /**
   * Nome do produto.
   * Deve ser único no banco de dados.
   * @type {String}
   */
  name: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * Preço do produto armazenado em centavos.
   * Exemplo: R$ 49,90 é armazenado como 4990.
   * @type {Number}
   */
  price: {
    type: Number,
    required: true
  },

  /**
   * Posição do produto na ordenação manual.
   * @type {Number}
   */
  order: {
    type: Number,
    default: 0
  }

});

/**
 * Modelo Mongoose responsável pela persistência
 * e manipulação dos produtos no banco de dados.
 *
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("Product", ProductSchema);