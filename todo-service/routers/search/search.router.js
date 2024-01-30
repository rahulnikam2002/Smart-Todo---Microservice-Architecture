const router = require("express").Router();
const { contorllers } = require("../../controllers/controller.expots");
const { authorizeCrossServiceRequest } = require("../../middlewares/authorization/crossAuth.middleware");

// Search specific routes
router.get("/", authorizeCrossServiceRequest, contorllers.search);
router.get("/category", authorizeCrossServiceRequest, contorllers.searchTodoByCategory);
router.get("/date", authorizeCrossServiceRequest, contorllers.searchTodoByDate);

module.exports = router;
