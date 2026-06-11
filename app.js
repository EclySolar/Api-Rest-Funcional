const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");

const session = require("express-session");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "minha-chave-super-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
      httpOnly: true
    }
  })
);

app.set("view engine", "ejs");

connectDB();

app.use("/products", require("./routes/productRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.get("/choose", (req, res) => {
  res.render("choose");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", auth, async (req, res) => {
  const products = await Product.find().sort({ order: 1 });
  res.render("index", { products });
});

app.get("/edit/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit", { product });
});

app.get("/up/:id", auth, async (req, res) => {
  const p = await Product.findById(req.params.id);

  if (!p) return res.redirect("/dashboard");

  const acima = await Product.findOne({
    order: { $lt: p.order }
  }).sort({ order: -1 });

  if (!acima) return res.redirect("/dashboard");

  const temp = p.order;
  p.order = acima.order;
  acima.order = temp;

  await p.save();
  await acima.save();

  res.redirect("/dashboard");
});

app.get("/down/:id", auth, async (req, res) => {
  const p = await Product.findById(req.params.id);

  if (!p) return res.redirect("/dashboard");

  const abaixo = await Product.findOne({
    order: { $gt: p.order }
  }).sort({ order: 1 });

  if (!abaixo) return res.redirect("/dashboard");

  const temp = p.order;
  p.order = abaixo.order;
  abaixo.order = temp;

  await p.save();
  await abaixo.save();

  res.redirect("/dashboard");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});