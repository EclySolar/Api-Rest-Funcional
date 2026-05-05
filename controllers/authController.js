const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    email: req.body.email,
    password: hash
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ msg: "Erro" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json({ msg: "Erro" });

  const token = jwt.sign({ id: user._id }, "segredo");
  res.json({ token });
};