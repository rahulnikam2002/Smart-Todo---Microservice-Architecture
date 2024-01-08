const verifyJWT = require("../../utils/Auth/JWT/verifyJWT");

exports.verifyJWTMiddleware = (req, res, next) => {
  try {
    const token = req.headers["x-secret-token"];

    if (!token) {
      throw {
        message: "X-SECRET-TOKEN is required",
        statusCode: 404
      };
    }

    const verifyToken = verifyJWT(token, process.env.AUTH_TOKEN_SECRET);

    if (!verifyToken.value) {
      throw {
        message: "Invalid X-SECRET-TOKEN",
        statusCode: 401
      };
    }

    req.userEmail = verifyToken.value.userEmail;

    return next();
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).send({
      message: error.message,
      statusCode: status
    });
  }
};
