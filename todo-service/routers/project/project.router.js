const router = require("express").Router();
const { contorllers } = require("../../controllers/controller.expots");
const { authorizeCrossServiceRequest } = require("../../middlewares/authorization/crossAuth.middleware");
const { validation } = require("../../middlewares/validation/validation");
const { newProjectSchema } = require("../../utils/validation/schemas/newProject.vschema");

router.post("/create", authorizeCrossServiceRequest, validation(newProjectSchema), contorllers.createProject);

module.exports = router;
