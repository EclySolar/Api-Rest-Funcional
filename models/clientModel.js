const db = require("../config/db");

/**
 * Lista todos os clientes.
 *
 * @async
 * @returns {Promise<Array>} Lista de clientes.
 */
exports.findAll = async () => {
  const [rows] = await db.execute(
    "SELECT * FROM clientes ORDER BY id_cliente"
  );

  return rows;
};

/**
 * Busca um cliente pelo ID.
 *
 * @async
 * @param {number} id ID do cliente.
 * @returns {Promise<Object|undefined>} Cliente encontrado.
 */
exports.findById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM clientes WHERE id_cliente = ?",
    [id]
  );

  return rows[0];
};

/**
 * Cria um novo cliente.
 *
 * @async
 * @param {string} nome Nome do cliente.
 * @param {string} telefone Telefone do cliente.
 * @param {string} status Status do cliente.
 * @returns {Promise<Object>} Resultado da inserção.
 */
exports.create = async (nome, telefone, status) => {
  const [result] = await db.execute(
    "INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)",
    [nome, telefone, status || "medio"]
  );

  return result;
};

/**
 * Atualiza um cliente.
 *
 * @async
 * @param {number} id ID do cliente.
 * @param {string} nome Nome do cliente.
 * @param {string} telefone Telefone do cliente.
 * @param {string} status Status do cliente.
 * @returns {Promise<Object>} Resultado da atualização.
 */
exports.update = async (id, nome, telefone, status) => {
  const [result] = await db.execute(
    "UPDATE clientes SET nome = ?, telefone = ?, status = ? WHERE id_cliente = ?",
    [nome, telefone, status, id]
  );

  return result;
};

/**
 * Remove um cliente.
 *
 * @async
 * @param {number} id ID do cliente.
 * @returns {Promise<Object>} Resultado da exclusão.
 */
exports.delete = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM clientes WHERE id_cliente = ?",
    [id]
  );

  return result;
};