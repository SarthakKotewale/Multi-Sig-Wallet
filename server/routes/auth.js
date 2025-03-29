const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerValidation } = require("../validators/authValidation");
const validator = require("../middleware/validator");

router.post(
  "/register",
  validator(registerValidation),
  authController.registerUser
);

module.exports = router;
