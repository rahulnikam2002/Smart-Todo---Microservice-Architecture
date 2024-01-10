const Joi = require("joi");

exports.validJWTSchema = Joi.object({
  jwtToken: Joi.string().min(10).required()
});
