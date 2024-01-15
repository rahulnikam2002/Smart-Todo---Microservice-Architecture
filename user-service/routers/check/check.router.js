const { controller } = require("../../controller/exports");
const { validateAuthorizationToken } = require("../../middlewares/secureRequestCalls/checkAuthorizationToken");
const { validation } = require("../../middlewares/validation/validation");
const { emailSchema } = require("../../utils/validation/schemas/email.vschema");
const { validJWTSchema } = require("../../utils/validation/schemas/jwt.vschema");
const checkRouter = require("express").Router();

checkRouter.post("/user/database", validateAuthorizationToken, validation(emailSchema), controller.checkIsUserInDatabase);
checkRouter.post("/jwt", validateAuthorizationToken, validation(validJWTSchema), controller.authorizeUserToken);

module.exports = checkRouter;
