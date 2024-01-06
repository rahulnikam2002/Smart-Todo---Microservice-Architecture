const Joi = require("joi");

const signupSchema = Joi.object({
  userName: Joi.string().min(2).max(30).required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required(),
  userNumber: Joi.number().required(),
  userAvatar: Joi.string()
});

module.exports = signupSchema;
