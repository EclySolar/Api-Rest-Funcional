const db = require("../config/db");

/**
 * Busca um usuário pelo nick.
 *
 * @async
 * @param {string} nick Nick do usuário.
 *
 * @returns {Promise<Object|undefined>} Retorna o usuário encontrado ou undefined.
 */
exports.buscarPorNick = async (nick) => {
  const [rows] = await db.execute(
    "SELECT id_usuario, nome, nick, senha FROM usuarios WHERE nick = ?",
    [nick]
  );

  return rows[0];
};