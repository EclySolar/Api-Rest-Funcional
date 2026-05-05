const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/products", require("./routes/productRoutes"));

app.listen(3000, () => console.log("Rodando na porta 3000"));