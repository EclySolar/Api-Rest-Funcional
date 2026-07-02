const db = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.execute(
    `SELECT p.id_pedido, p.data, p.clientes_id_cliente, c.nome AS cliente
     FROM pedidos p
     INNER JOIN clientes c ON c.id_cliente = p.clientes_id_cliente
     ORDER BY p.id_pedido`
  );

  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.execute(
    `SELECT p.id_pedido, p.data, p.clientes_id_cliente, c.nome AS cliente
     FROM pedidos p
     INNER JOIN clientes c ON c.id_cliente = p.clientes_id_cliente
     WHERE p.id_pedido = ?`,
    [id]
  );

  return rows[0];
};

exports.findItemsByOrderId = async (id) => {
  const [rows] = await db.execute(
    `SELECT pp.produtos_id_produto, pr.nome, pp.quantidade, pp.valor
     FROM produtos_pedidos pp
     INNER JOIN produtos pr ON pr.id_produto = pp.produtos_id_produto
     WHERE pp.pedidos_id_pedido = ?`,
    [id]
  );

  return rows;
};

exports.create = async (data, clientes_id_cliente, itens) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [pedidoResult] = await connection.execute(
      "INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)",
      [data, clientes_id_cliente]
    );

    const idPedido = pedidoResult.insertId;

    for (const item of itens) {
      await connection.execute(
        `INSERT INTO produtos_pedidos
         (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
         VALUES (?, ?, ?, ?)`,
        [
          item.produtos_id_produto,
          idPedido,
          item.quantidade,
          item.valor
        ]
      );
    }

    await connection.commit();

    return idPedido;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

exports.update = async (id, data, clientes_id_cliente, itens) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [pedidoResult] = await connection.execute(
      "UPDATE pedidos SET data = ?, clientes_id_cliente = ? WHERE id_pedido = ?",
      [data, clientes_id_cliente, id]
    );

    await connection.execute(
      "DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?",
      [id]
    );

    for (const item of itens) {
      await connection.execute(
        `INSERT INTO produtos_pedidos
         (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
         VALUES (?, ?, ?, ?)`,
        [
          item.produtos_id_produto,
          id,
          item.quantidade,
          item.valor
        ]
      );
    }

    await connection.commit();

    return pedidoResult;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

exports.delete = async (id) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      "DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?",
      [id]
    );

    const [result] = await connection.execute(
      "DELETE FROM pedidos WHERE id_pedido = ?",
      [id]
    );

    await connection.commit();

    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};