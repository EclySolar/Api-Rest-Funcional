const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Um ou mais campos estão vazios");
    }

    if (password.length < 8) {
      return res.send("A senha deve ter no mínimo 8 caracteres");
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hash
    });

    res.redirect("/login");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Um ou mais campos estão vazios");
    }

    const user = await User.findOne({ email });

    if (!user) return res.send("Usuário não encontrado");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.send("Senha inválida");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true em produção (HTTPS)
      sameSite: "lax"
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};