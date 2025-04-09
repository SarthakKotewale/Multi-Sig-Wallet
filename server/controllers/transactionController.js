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
