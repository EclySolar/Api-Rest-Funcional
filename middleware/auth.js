const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, "segredo");
    req.user = decoded;
    next();
  } catch {
    res.redirect("/login");
  }
};