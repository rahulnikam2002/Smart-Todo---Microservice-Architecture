const { verify } = require("jsonwebtoken");

/**
 * Verifies a JSON Web Token (JWT) using the provided secret key.
 *
 * @param {string} token - The JWT to be verified.
 * @param {string} secretKey - The secret key used for verification.
 * @returns {Object} - An object with information about the verification result.
 *                    - {string|null} error - Error message, or null if no error.
 *                    - {boolean} isError - Indicates if an error occurred.
 *                    - {*} value - The result of the token verification, or null if an error occurred.
 */

const verifyJWT = (token, secretKey) => {
  try {
    // Check if both token and secretKey are provided
    if (!token || !secretKey) {
      throw {
        error: "Token and Secret key are required",
        isError: true,
        value: null
      };
    }

    // Verify the token using the provided secretKey
    const isTokenValid = verify(token, secretKey);

    // Check if the verification result is falsy, indicating an invalid token
    if (!isTokenValid) {
      throw {
        error: "Invalid Token",
        isError: true,
        value: null
      };
    }

    // Return the verification result with no error
    return {
      error: null,
      isError: false,
      value: isTokenValid
    };
  } catch (error) {
    // Handle any exceptions during token verification
    return {
      error: error.message,
      isError: true,
      value: null
    };
  }
};

module.exports = verifyJWT;
