const redisClient = require("../../lib/redis/redis.connect");
const { createBcryptHash } = require("../../utils/Auth/Bcrypt/createHash");
const { verifyBcryptHash } = require("../../utils/Auth/Bcrypt/verifyHash");
const {checkInRedis} = require("../../utils/redis/checkInRedis");

/**
 * Verifies the OTP for a user, deletes OTP from Redis upon successful verification,
 * and returns a response indicating whether the account is verified.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

exports.verifyOTP = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;

    // Check if OTP exists in Redis
    const { value, isError, error } = await checkInRedis(`${userEmail}_OTP`);

    if (!value || isError) {
      // No OTP found in Redis
      throw {
        message: "No OTP found",
        statusCode: 404
      };
    }

    // Parse OTP value from Redis
    const parsedValue = JSON.parse(value);
    const stringOTP = String(otp);

    // Verify OTP using bcrypt
    const compareOTP = await verifyBcryptHash(stringOTP, parsedValue.ciperOTP);

    if (!compareOTP) {
      // Invalid OTP
      throw {
        message: "Invalid OTP",
        statusCode: 401
      };
    }

    // Delete OTP from Redis after successful verification
    await redisClient.del(`${userEmail}_OTP`);

    // Create a bcrypt hash for the user's email
    const hashEmail = await createBcryptHash(userEmail);

    // Send success response
    return res.send({
      verified: true,
      message: "Account verified",
      token: hashEmail.ciperText
    });
  } catch (error) {
    // Handle and send error response
    const status = error.statusCode || 500;
    res.status(status).send({
      message: error.message,
      verified: false
    });
  }
};