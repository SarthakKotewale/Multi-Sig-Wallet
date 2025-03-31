const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidation");
const validator = require("../middleware/validator");

router.post(
  "/register",
  validator(registerValidation),
  authController.registerUser
);

router.post("/login", validator(loginValidation), authController.loginUser);

module.exports = router;
