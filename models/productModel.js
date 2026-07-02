const db = require("../config/db");

/**
 * Lista todos os produtos.
 *
 * @async
 * @returns {Promise<Array>} Lista de produtos.
 */
exports.findAll = async () => {
  const [rows] = await db.execute(
    `SELECT *
     FROM produtos
     ORDER BY id_produto`
  );

  return rows;
};

/**
 * Busca um produto pelo ID.
 *
 * @async
 * @param {number} id ID do produto.
 *
 * @returns {Promise<Object|undefined>} Produto encontrado.
 */
exports.findById = async (id) => {
  const [rows] = await db.execute(
    `SELECT *
     FROM produtos
     WHERE id_produto = ?`,
    [id]
  );

  return rows[0];
};

/**
 * Cria um novo produto.
 *
 * @async
 * @param {string} nome Nome do produto.
 * @param {number} valor Valor do produto.
 * @param {number} estoque Quantidade em estoque.
 * @param {number} categorias_id_categoria ID da categoria.
 *
 * @returns {Promise<Object>} Resultado da inserção.
 */
exports.create = async (nome, valor, estoque, categorias_id_categoria) => {
  const [result] = await db.execute(
    `INSERT INTO produtos
    (nome, valor, estoque, categorias_id_categoria)
    VALUES (?, ?, ?, ?)`,
    [nome, valor, estoque, categorias_id_categoria]
  );

  return result;
};

/**
 * Atualiza um produto.
 *
 * @async
 * @param {number} id ID do produto.
 * @param {string} nome Nome do produto.
 * @param {number} valor Valor do produto.
 * @param {number} estoque Quantidade em estoque.
 * @param {number} categorias_id_categoria ID da categoria.
 *
 * @returns {Promise<Object>} Resultado da atualização.
 */
exports.update = async (
  id,
  nome,
  valor,
  estoque,
  categorias_id_categoria
) => {
  const [result] = await db.execute(
    `UPDATE produtos
     SET
        nome = ?,
        valor = ?,
        estoque = ?,
        categorias_id_categoria = ?
     WHERE id_produto = ?`,
    [nome, valor, estoque, categorias_id_categoria, id]
  );

  return result;
};

/**
 * Remove um produto.
 *
 * @async
 * @param {number} id ID do produto.
 *
 * @returns {Promise<Object>} Resultado da exclusão.
 */
exports.delete = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM produtos WHERE id_produto = ?",
    [id]
  );

  return result;
};