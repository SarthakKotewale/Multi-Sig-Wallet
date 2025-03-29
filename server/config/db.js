const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected..!");
  } catch (err) {
    console.error(err.message);
    console.log("Error-----", err);
    process.exit(1);
  }
};

module.exports = connectDB;
