const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const transactionController = require("../controllers/transactionController");
const {
  transactionValidation,
} = require("../validators/transactionValidation");
const validator = require("../middleware/validator");

router.post(
  "/create-transaction",
  auth,
  validator(transactionValidation),
  transactionController.createTransaction
);
router.put(
  "/approve-transaction/:id",
  auth,
  transactionController.approveTransaction
);
router.put(
  "/reject-transaction/:id",
  auth,
  transactionController.rejectTransaction
);
module.exports = router;
