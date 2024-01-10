const { signIn } = require("./auth/signin.controller");
const { signUp } = require("./auth/signup.controller");
const { sendOTP } = require("./verifications/sendOtp.controller");
const { verifyOTP } = require("./verifications/verifyOtp.controller");
const { checkIsUserInDatabase } = require("./check/isUser.controller");
const { authorizeUserToken } = require("./check/jwt.js");

exports.controller = {
  signIn,
  signUp,
  sendOTP,
  verifyOTP,
  checkIsUserInDatabase,
  authorizeUserToken
};
