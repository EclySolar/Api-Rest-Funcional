const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.set("view engine", "ejs");

connectDB();

app.use("/products", require("./routes/productRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("index", { products });
});

app.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});