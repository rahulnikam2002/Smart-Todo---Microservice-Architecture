const verifyJWT = require("../../utils/Auth/JWT/verifyJWT");

/**
 * Middleware to validate the authorization token in the request headers.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Calls the next middleware or returns a response with an error status.
 */


exports.validateAuthorizationToken = (req, res, next) => {
  try {
    // Extract the Bearer token from the Authorization header
    const bearerToken = req.headers.authorization;

    // Check if the Authorization header or Bearer token is missing
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw {
        message: "Missing authorization token",
        statusCode: 401
      };
    }

    // Extract the token from the Bearer token string
    const token = bearerToken.split(" ")[1];

    // Check if the token is empty or undefined
    if (!token) {
      throw {
        message: "Empty authorization token",
        statusCode: 401
      };
    }

    // Verify the token using the verifyJWT utility function
    const { value, isError, error } = verifyJWT(token, process.env.AUTHORIZATION_SECRET_KEY);

    // Check if the token verification was successful
    if (!isError) {
      return next();
    } else {
      // If verification failed, throw an error
      throw {
        message: "Invalid authorization token",
        statusCode: 401
      };
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};
