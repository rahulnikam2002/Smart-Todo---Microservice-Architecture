const mongoose = require("mongoose");

const connectMongooseDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log("MongoDB connected!");
      return;
    }
    throw new Error("Connection failed");
  } catch (error) {
    console.log({
      errorType: "Database",
      error: error.message
    });
  }
};

module.exports = connectMongooseDB;
