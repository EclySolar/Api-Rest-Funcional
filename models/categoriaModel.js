const db = require("../config/db");

/**
 * Retorna todas as categorias.
 *
 * @async
 * @returns {Promise<Array>}
 */
exports.listar = async () => {
  const [rows] = await db.execute(
    "SELECT * FROM categorias ORDER BY id_categoria"
  );

  return rows;
};

/**
 * Busca uma categoria pelo ID.
 *
 * @async
 * @param {number} id ID da categoria.
 *
 * @returns {Promise<Object|undefined>}
 */
exports.buscarPorId = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM categorias WHERE id_categoria = ?",
    [id]
  );

  return rows[0];
};

/**
 * Insere uma nova categoria.
 *
 * @async
 * @param {string} nome Nome da categoria.
 */
exports.criar = async (nome) => {
  const [result] = await db.execute(
    "INSERT INTO categorias (nome) VALUES (?)",
    [nome]
  );

  return result;
};

/**
 * Atualiza uma categoria.
 *
 * @async
 * @param {number} id ID da categoria.
 * @param {string} nome Novo nome.
 */
exports.atualizar = async (id, nome) => {
  const [result] = await db.execute(
    "UPDATE categorias SET nome = ? WHERE id_categoria = ?",
    [nome, id]
  );

  return result;
};

/**
 * Remove uma categoria.
 *
 * @async
 * @param {number} id ID da categoria.
 */
exports.excluir = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM categorias WHERE id_categoria = ?",
    [id]
  );

  return result;
};