// Importing the verifyJWT function for JWT token verification
const verifyJWT = require("../../utils/Auth/JWT/verifyJWT");

/**
 * Middleware function to authorize and validate a user's JWT token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

exports.authorizeUserToken = (req, res) => {
  try {
    // Extracting JWT token from the request body
    const { jwtToken } = req.body;

    // Verifying the JWT token using the verifyJWT function
    const { value, isError, error } = verifyJWT(
      jwtToken,
      process.env.AUTH_TOKEN_SECRET
    );

    // Handling invalid token scenario
    if (isError) {
      throw {
        isTokenValid: value ? true : false,
        message: "Invalid JWT",
        statusCode: 401
      };
    }

    // Sending a success response with token information
    res.status(200).send({
      isTokenValid: value ? true : false,
      tokenInformation: {
        email: value.userEmail,
        _id: value._id
      }
    });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    const status = error.statusCode || 500;
    return res.status(status).send({
      isTokenValid: error.isTokenValid,
      message: error.message,
      statusCode: error.statusCode
    });
  }
};
