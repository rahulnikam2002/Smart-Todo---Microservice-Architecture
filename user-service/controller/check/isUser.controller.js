const { checkInRedis } = require("../../utils/redis/checkInRedis");
const { createJWT } = require("../../utils/Auth/JWT/createJWT");
const userModel = require("../../models/user/user.model");

/**
 * Controller function to check if a user exists in the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating user existence.
 */
exports.checkIsUserInDatabase = async (req, res) => {
  try {
    // Extract user email from the request body
    const { userEmail } = req.body;

    // Create JWT token for user
    const userToken = createJWT({ userEmail }, process.env.AUTH_TOKEN_SECRET, "1d");

    // Check if user is cached in Redis
    const { value: isCached, isError: isRedisError } = await checkInRedis(userEmail);

    // Respond if user is found in the Redis cache
    if (isCached && !isRedisError) {
      return res.status(200).json({
        userExist: true,
        message: "User is present in the database",
        statusCode: 200,
        userToken: userToken.value
      });
    }

    // Check if user exists in the database
    const isUserInDatabase = await userModel.findOne({ userEmail }).select("userEmail");

    // Respond based on user existence in the database
    if (!isUserInDatabase) {
      return res.status(200).json({
        userExist: false,
        message: "User doesn't exist",
        statusCode: 200
      });
    }

    // Respond if user is found in the database
    return res.status(200).json({
      userExist: true,
      message: "User is present in the database",
      statusCode: 200,
      userToken: userToken.value
    });
  } catch (error) {
    // Handle internal server error and log the details
    return res.status(500).json({
      error: "Internal Server Error",
      statusCode: 500
    });
  }
};
