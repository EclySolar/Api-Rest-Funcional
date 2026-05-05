const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
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

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json(updated);
    }

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ msg: "Deletado" });
    }

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};