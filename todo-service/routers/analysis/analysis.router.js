const router = require("express").Router();
const { contorllers } = require("../../controllers/controller.expots");
const { authorizeCrossServiceRequest } = require("../../middlewares/authorization/crossAuth.middleware");

router.get("/todo/date", authorizeCrossServiceRequest, contorllers.analysisSingleDayProgress);

module.exports = router;
