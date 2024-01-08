const { controller } = require("../../controller/exports");
const { validateAuthorizationToken } = require("../../middlewares/secureRequestCalls/checkAuthorizationToken");
const { validation } = require("../../middlewares/validation/validation");
const { emailSchema } = require("../../utils/validation/schemas/email.vschema");
const checkRouter = require("express").Router();

checkRouter.post("/user/database", validateAuthorizationToken, validation(emailSchema), controller.checkIsUserInDatabase)

module.exports = checkRouter;
