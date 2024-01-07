const router = require("express").Router();
const { controller } = require("../../controller/exports");
const { OTPAuthorization } = require("../../middlewares/otp/otpAuthorization");
const {
  rateLimiterFunctions
} = require("../../middlewares/rateLimiter/exports.rateLimiter");
const { rateLimiter } = require("../../middlewares/rateLimiter/rateLimiter");
const {
  validateAuthorizationToken
} = require("../../middlewares/secureRequestCalls/checkAuthorizationToken");
const {
  checkUserToken
} = require("../../middlewares/secureRequestCalls/checkUserToken");
const { validation } = require("../../middlewares/validation/validation");
const { emailSchema } = require("../../utils/validation/schemas/email.vschema");
const signupSchema = require("../../utils/validation/schemas/signup.vschema");

router.post(
  "/send/otp",
  rateLimiterFunctions.sendOtp_RateLimiter,
  validation(emailSchema),
  validateAuthorizationToken,
  controller.sendOTP
);

router.post(
  "/otp/verification",
  rateLimiterFunctions.verifyOtp_RateLimiter,
  OTPAuthorization,
  controller.verifyOTP
);

router.post(
  "/signup",
  rateLimiterFunctions.signUp_RateLimiter,
  validation(signupSchema),
  validateAuthorizationToken, // Global Token!
  checkUserToken,
  controller.signUp
);

router.post(
  "/signin",
  rateLimiterFunctions.signIn_RateLimiter,
  validation,
  validateAuthorizationToken,
  controller.signIn
);

module.exports = router;
