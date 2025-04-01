const Wallet = require("../models/Wallet");
const User = require("../models/User");

exports.createSharedWallet = async (req, res) => {
  const { name, owners, threshold } = req.body;
  try {
    const exisitingWallet = await Wallet.findOne(); //only one wllet allowed for now...
    if (exisitingWallet) {
      return res.status(400).json({ msg: "A shared wallet already exists." });
    }
    if (!owners.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "Current user must be an owner of the wallet " });
    }
    for (const ownerId of owners) {
      const user = await User.findById(ownerId);
      if (!user) {
        return res
          .status(400)
          .json({ msg: `Owner with ID ${ownerId} not found` });
      }
    }
    const wallet = new Wallet({ name, owners, threshold });
    await wallet.save();

    // Add the wallet to the user's wallets array
    // update the array.
    for (const ownerId of owners) {
      const user = await User.findById(ownerId);
      // **No need for an array. Just store the wallet ID.**
      user.wallets = wallet.id; // Changed to assignment, not push
      await user.save();
    }
    res.json(wallet);
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).send("Server error - createSharedWallet ...");
  }
};
