const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  threshold: {
    type: Number,
    required: true,
    default: 2,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

module.exports = mongoose.model("Wallet", WalletSchema);
