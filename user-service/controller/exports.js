const { signIn } = require("./auth/signin.controller");
const { signUp } = require("./auth/signup.controller");
const { sendOTP } = require("./verifications/sendOtp.controller");
const { verifyOTP } = require("./verifications/verifyOtp.controller");
const { checkIsUserInDatabase } = require("./check/isUser.controller");
const { authorizeUserToken } = require("./check/jwt.js");
const { getUserProfile } = require("./user/profile.controller");

exports.controller = {
    signIn,
    signUp,
    sendOTP,
    verifyOTP,
    checkIsUserInDatabase,
    authorizeUserToken,
    getUserProfile
};
