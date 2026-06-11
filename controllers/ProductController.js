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

    await Product.create({
      name,
      price: parsePrice(price),
      order: count
    });

    return res.redirect("/dashboard");

  } catch (err) {
    return res.redirect("/dashboard");
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

    res.json(product);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price: parsePrice(price)
      },
      { new: true }
    );

    return res.redirect("/dashboard");

  } catch (err) {
    return res.redirect("/dashboard");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    if (
      req.headers.accept &&
      req.headers.accept.includes("application/json")
    ) {
      return res.json({ msg: "Deletado" });
    }

    res.redirect("/dashboard");

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};