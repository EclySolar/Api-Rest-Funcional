const orderModel = require("../models/orderModel");

/**
 * Valida se existe usuário autenticado e ID de usuário na requisição.
 *
 * @param {import("express").Request} req
 * @returns {boolean}
 */
function validarAcesso(req) {
  const idUsuarioHeader = Number(req.headers["id-usuario"]);
  return req.session.user && idUsuarioHeader === req.session.user.id_usuario;
}

/**
 * Lista todos os pedidos.
 */
exports.getOrders = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const orders = await orderModel.findAll();

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Busca um pedido pelo ID.
 */
exports.getOrderById = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado"
      });
    }

    order.itens = await orderModel.findItemsByOrderId(req.params.id);

    return res.status(200).json(order);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Cria um pedido.
 */
exports.createOrder = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const {
      data,
      clientes_id_cliente,
      itens
    } = req.body;

    if (!data || !clientes_id_cliente || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        error: "Dados do pedido inválidos"
      });
    }

    const idPedido = await orderModel.create(
      data,
      clientes_id_cliente,
      itens
    );

    return res.status(201).json({
      message: "Pedido criado com sucesso",
      id_pedido: idPedido
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Atualiza um pedido.
 */
exports.updateOrder = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const {
      data,
      clientes_id_cliente,
      itens
    } = req.body;

    if (!data || !clientes_id_cliente || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        error: "Dados do pedido inválidos"
      });
    }

    const result = await orderModel.update(
      req.params.id,
      data,
      clientes_id_cliente,
      itens
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Pedido não encontrado"
      });
    }

    return res.status(200).json({
      message: "Pedido atualizado com sucesso"
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

/**
 * Remove um pedido.
 */
exports.deleteOrder = async (req, res) => {
  try {
    if (!validarAcesso(req)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const result = await orderModel.delete(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Pedido não encontrado"
      });
    }

    return res.status(200).json({
      message: "Pedido removido com sucesso"
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};