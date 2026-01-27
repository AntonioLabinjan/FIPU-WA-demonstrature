const jwt = require("jsonwebtoken");

function authoriseUser(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header nedostaje" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Neispravan Authorization format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.username;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Neispravan ili istekao token" });
  }
}

module.exports = {
  authoriseUser,
};