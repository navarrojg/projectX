const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "thats_what_she_said_or_he_said");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!",
    });
  }
};
