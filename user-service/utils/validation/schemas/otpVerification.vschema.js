const Joi = require("joi");

/**
 * Joi schema for OTP verification.
 *
 * @type {Object}
 * @property {Joi.StringSchema} otp - The OTP code, a string of length 4, required.
 * @property {Joi.StringSchema} userEmail - The user's email, a string in email format, required.
 */
exports.OTPVerificationSchema = Joi.object({
  otp: Joi.string().length(4).required(),
  userEmail: Joi.string().email().required()
});
