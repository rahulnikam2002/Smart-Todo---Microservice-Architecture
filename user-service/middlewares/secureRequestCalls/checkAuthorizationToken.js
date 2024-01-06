exports.validateAuthorizationToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw {
        message: "Missing authorization token",
        statusCode: 401
      };
    }

    const token = bearerToken.split(" ")[1];

    if (token === undefined || token === null || token === "") {
      throw {
        message: "Empty authorization token",
        statusCode: 401
      };
    }

    const checkTokenValidation = token === "Rahul";

    if (checkTokenValidation) {
      return next();
    } else {
      throw {
        message: "Invalid authorization token",
        statusCode: 401
      };
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    console.error("Authorization Token Validation Error:", error);
    return res.status(statusCode).json({ message: error.message });
  }
};
