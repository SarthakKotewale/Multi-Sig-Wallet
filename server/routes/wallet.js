const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const walletController = require("../controllers/walletController");
const { walletValidation } = require("../validators/walletValidation");
const validator = require("../middleware/validator");

router.post(
  "/createshared",
  auth,
  validator(walletValidation),
  walletController.createSharedWallet
);
module.exports = router;
