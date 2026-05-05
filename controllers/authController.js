const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      email: req.body.email,
      password: hash
    });

    res.redirect("/login");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("Usuário não encontrado");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Senha inválida");

    const token = jwt.sign({ id: user._id }, "segredo");

    res.cookie("token", token);
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};