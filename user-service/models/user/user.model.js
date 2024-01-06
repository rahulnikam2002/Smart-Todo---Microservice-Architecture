const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
    userPassword: {
      type: String,
      required: true
    },
    userNumber: {
      type: Number,
      required: true,
      unique: true
    },
    userAvatar: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
