const router = require("express").Router();
const { controller } = require("../../controller/exports");
const {
  validateAuthorizationToken
} = require("../../middlewares/secureRequestCalls/checkAuthorizationToken");
const { validation } = require("../../middlewares/validation/validation");
const signupSchema = require("../../utils/validation/schemas/signup.vschema");

router.post(
  "/signup",
  validation(signupSchema),
  validateAuthorizationToken,
  controller.signUp
);
router.post("/signin", validation, controller.signIn);

module.exports = router;
