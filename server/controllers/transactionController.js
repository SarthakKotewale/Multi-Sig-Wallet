const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

exports.createTransaction = async (req, res) => {
  const { amount, recepient, description } = req.body;
  try {
    const wallet = await Wallet.findOne();
    if (!wallet) {
      return res.status(400).json({ msg: "No Wallet found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!wallet.owners.includes(req.user.id)) {
      res.status(401).json({ msg: "User is not the owner of the wallet..." });
    }
    const transaction = new Transaction({
      wallet: wallet.id,
      amount,
      recepient,
      description,
    });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.approveTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  try {
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found... " });
    }

    const wallet = await Wallet.findById(transaction.wallet);
    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found... " });
    }

    if (!wallet.owners.includes(req.user.id)) {
      return res.status(401).json({ msg: "User not authorised... " });
    }

    if (transaction.approvals.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "Transaction already approved by this user... " });
    }
    if (transaction.rejections.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "Cannot approve a rejected transaction" });
    }
    transaction.approvals.push(req.user.id);
    await transaction.save();

    if (transaction.approvals.length >= wallet.threshold) {
      transaction.status = "approved";
      await transaction.save();
    }
    res.json(transaction);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.rejectTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    const wallet = await Wallet.findById(transaction.wallet);
    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    if (!wallet.owners.includes(req.user.id)) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    if (transaction.rejections.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "Transaction already rejected by this user" });
    }
    if (transaction.approvals.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "Cannot reject an approved transaction" });
    }

    transaction.rejections.push(req.user.id);
    transaction.status = "rejected";
    await transaction.save();

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getTransactions = async (req, res) => {
  const wallet = await Wallet.findOne();
  try {
    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found..." });
    }

    if (!wallet.owners.includes(req.user.id)) {
      return res.status(401).json({ msg: "User not authorised... " });
    }
    const transactions = await Transaction.find({ wallet: wallet.id });
    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
