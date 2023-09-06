require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection SUCCESS!");
  } catch (err) {
    console.log("Database Connection FAILED!");
    process.exit(1);
  }
};

module.exports = connectDB;
