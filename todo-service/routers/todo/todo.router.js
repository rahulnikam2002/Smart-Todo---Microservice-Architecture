const router = require("express").Router();
const { contorllers } = require("../../controllers/controller.expots");
const {
  authorizeRequest
} = require("../../middlewares/authorization/auth.middleware");

router.post("/create", authorizeRequest, contorllers.createTodo);

module.exports = router;
