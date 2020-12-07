const express = require("express");
const router = express.Router();

// load controller
const authController = require("../../controllers/authController");

// user registration
router.post("/register", authController.customerRegistration);

// user login
router.post("/login", authController.userLogin);

// logout
router.get("/logout", authController.userLogout);

// forget password
router.post("/forget/password", authController.recoverPassword);

module.exports = router;
