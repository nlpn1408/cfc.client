const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to database successfully");
  } catch (error) {
    console.log("Connect to database failed");
  }
};

module.exports = mongoConnect;
