const router = require("express").Router();
const { controller } = require("../../controller/exports");
const {
  validateAuthorizationToken
} = require("../../middlewares/secureRequestCalls/checkAuthorizationToken");
const { validation } = require("../../middlewares/validation/validation");
const { emailSchema } = require("../../utils/validation/schemas/email.vschema");
const signupSchema = require("../../utils/validation/schemas/signup.vschema");

router.post(
  "/signup",
  validation(signupSchema),
  validateAuthorizationToken,
  controller.signUp
);

router.post(
  "/send/otp",
  validation(emailSchema),
  validateAuthorizationToken,
  controller.sendOTP
);

router.post("/signin", validation, controller.signIn);

module.exports = router;
