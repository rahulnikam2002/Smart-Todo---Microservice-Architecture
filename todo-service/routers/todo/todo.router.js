const router = require("express").Router();
const { contorllers } = require("../../controllers/controller.expots");
const { validateAuthorizationToken } = require("../../middlewares/authorization/checkAuthorizationToken");
const { authorizeCrossServiceRequest } = require("../../middlewares/authorization/crossAuth.middleware");
const { validation } = require("../../middlewares/validation/validation");
const { singleTodoSchema, updateTodoSchema } = require("../../utils/validation/schemas/singleTodo.vschema");

router.post("/create", authorizeCrossServiceRequest, validation(singleTodoSchema), contorllers.createTodo);
router.put("/update", authorizeCrossServiceRequest, validation(updateTodoSchema), contorllers.updateTodo);
router.put("/update/completed", authorizeCrossServiceRequest, contorllers.updateTodoStatusToCompleted);

// Get specific routes
router.get("/todos", validateAuthorizationToken, authorizeCrossServiceRequest, contorllers.fetchAllTodos);
router.get("/todos/count", validateAuthorizationToken, authorizeCrossServiceRequest, contorllers.getRecentTodos);

// Delete sprcific routes
router.delete("/delete", authorizeCrossServiceRequest, contorllers.deleteMany);

module.exports = router;
