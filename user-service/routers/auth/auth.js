const router = require("express").Router();
const { controller } = require("../../controller/exports");
const { validation } = require("../../middlewares/validation/validation");

router.post("/signup", validation, controller.signUp);
router.post("/signin", validation, controller.signIn);

module.exports = router;
