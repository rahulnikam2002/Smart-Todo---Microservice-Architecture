const Joi = require("joi");

exports.emailSchema = Joi.object({
  userEmail: Joi.string().email().required()
});
