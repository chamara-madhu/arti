// const jwt = require("jsonwebtoken");
// const { secretOfKey } = require("../config/keys");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, secretOfKey);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Auth failed" });
//   }
// };

const expressJwt = require("express-jwt"); // for authorization check
const { secretOfKey } = require("../config/keys");

exports.requireLogin = expressJwt({
  secret: secretOfKey,
  userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    res.status(403).json({ error: "User access denied" });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({ error: "Admin access denied" });
  }

  next();
};


