const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

connectDB();

app.use("/products", require("./routes/productRoutes"));

app.get("/", async (req, res) => {
  const products = await Product.find().sort({ order: 1 });
  res.render("index", { products });
});

app.get("/edit/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit", { product });
});

app.get("/up/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  p.order -= 1;
  await p.save();
  res.redirect("/");
});

app.get("/down/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  p.order += 1;
  await p.save();
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});