const { controller } = require("../../controller/exports");
const { validateAuthorizationToken } = require("../../middlewares/secureRequestCalls/checkAuthorizationToken");

const router = require("express").Router();

router.get("/user/profile", validateAuthorizationToken, controller.getUserProfile);

module.exports = router;
