const clientModel = require("../models/clientModel");

function validarAcesso(req) {
  const idUsuarioHeader = Number(req.headers["id-usuario"]);
  return req.session.user && idUsuarioHeader === req.session.user.id_usuario;
}

exports.getClients = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const clients = await clientModel.findAll();
    return res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const client = await clientModel.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({
        error: "Nome e telefone são obrigatórios"
      });
    }

    const result = await clientModel.create(nome, telefone, status);

    return res.status(201).json({
      message: "Cliente criado com sucesso",
      id_cliente: result.insertId,
      nome,
      telefone,
      status: status || "medio"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { nome, telefone, status } = req.body;

    if (!nome || !telefone || !status) {
      return res.status(400).json({
        error: "Nome, telefone e status são obrigatórios"
      });
    }

    const result = await clientModel.update(
      req.params.id,
      nome,
      telefone,
      status
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.status(200).json({
      message: "Cliente atualizado com sucesso"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const result = await clientModel.delete(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.status(200).json({
      message: "Cliente removido com sucesso"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};