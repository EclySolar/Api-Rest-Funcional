const express = require("express");
require("dotenv").config();

const session = require("express-session");

const auth = require("./middleware/auth");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

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
      maxAge: 1000 * 60 * 60,
      httpOnly: true
    }
  })
);

app.set("view engine", "ejs");

/* Rotas */
app.use("/auth", require("./routes/authRoutes"));
app.use("/categorias", require("./routes/categoriaRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

/* Swagger */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* Página inicial */
app.get("/", (req, res) => {
  res.render("home");
});

/* Escolha */
app.get("/choose", (req, res) => {
  res.render("choose");
});

/* Cadastro */
app.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("register");
});

/* Login */
app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("login");
});

/* Dashboard */
app.get("/dashboard", auth, (req, res) => {
  res.render("index", {
    products: []
  });
});

/* Rota pública exigida pela atividade */
app.get("/api/status", (req, res) => {
  res.json({
    versao: "2.0.0",
    status: "online"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});