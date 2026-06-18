const Product = require("../models/Product");

function parsePrice(value) {
  if (typeof value === "string") {
    return Math.round(Number(value.replace(",", ".")) * 100);
  }

  return Math.round(Number(value) * 100);
}

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