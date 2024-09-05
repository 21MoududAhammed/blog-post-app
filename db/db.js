const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log(`Database connected successfully.`);
  } catch (err) {
    console.error(`Failed to connect the mongodb. ${err?.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
