const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 11).then((hash) => {
    const user = new User({ email: req.body.email, password: hash });
  });
  user
    .save()
    .then((createdUser) => {
      res.status(201).json({
        message: "User created!",
        user: createdUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.userLogin = (req, res, next) => {};
