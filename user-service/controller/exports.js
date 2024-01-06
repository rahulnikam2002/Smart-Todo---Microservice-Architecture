const { signIn } = require("./auth/signin.controller");
const { signUp } = require("./auth/signup.controller");
const {sendOTP} = require("./verifications/sendOtp.controller")

exports.controller = {
  signIn,
  signUp,
  sendOTP
};
