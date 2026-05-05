const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(express.json());

// banco
connectDB();

// rotas
app.use("/products", require("./routes/productRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// servidor
app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});