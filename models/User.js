const mongoose = require("mongoose");

/**
 * @class User
 * @classdesc Representa um usuário cadastrado no sistema TechWorld.
 * Armazena as credenciais necessárias para autenticação.
 */
const UserSchema = new mongoose.Schema({

  /**
   * Endereço de e-mail do usuário.
   * Deve ser único no banco de dados.
   *
   * @type {String}
   */
  email: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * Senha criptografada do usuário.
   * É armazenada utilizando bcrypt.
   *
   * @type {String}
   */
  password: {
    type: String,
    required: true
  }

});

/**
 * Modelo Mongoose responsável pela persistência
 * e manipulação dos usuários no banco de dados.
 *
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("User", UserSchema);