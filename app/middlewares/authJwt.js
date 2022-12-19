const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    next();
    // return res.status(403).send({ message: "No token provided!" });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Unauthorized! Sign In with token Failed" });
      }
      req.username = decoded.username;
      req.password = decoded.password;
      next();
    });
  }
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
