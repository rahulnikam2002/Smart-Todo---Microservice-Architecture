const router = require("express").Router();
const { contorllers } = require("../../controllers/controller.expots");
const { validateAuthorizationToken } = require("../../middlewares/authorization/checkAuthorizationToken");
const { authorizeCrossServiceRequest } = require("../../middlewares/authorization/crossAuth.middleware");
const { validation } = require("../../middlewares/validation/validation");
const { singleTodoSchema, updateTodoSchema } = require("../../utils/validation/schemas/singleTodo.vschema");

router.post("/create", authorizeCrossServiceRequest, validation(singleTodoSchema), contorllers.createTodo);
router.put("/update", authorizeCrossServiceRequest, validation(updateTodoSchema), contorllers.updateTodo);
router.put("/update/completed", authorizeCrossServiceRequest, contorllers.updateTodoStatusToCompleted);

// Search specific routes
router.get("/search/name", authorizeCrossServiceRequest, contorllers.searchTodoByName);
router.get("/search/category", authorizeCrossServiceRequest, contorllers.searchTodoByCategory);
router.get("/search/date", authorizeCrossServiceRequest, contorllers.searchTodoByDate);

// Get specific routes
router.get("/todos", validateAuthorizationToken, authorizeCrossServiceRequest, contorllers.fetchAllTodos);

// Delete sprcific routes
router.delete("/delete", authorizeCrossServiceRequest, contorllers.deleteMany);

module.exports = router;
