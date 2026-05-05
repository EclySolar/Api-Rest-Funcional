const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model("Product", ProductSchema);