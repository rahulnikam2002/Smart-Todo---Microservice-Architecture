const { verifyBcryptHash } = require("../../utils/Auth/Bcrypt/verifyHash");

exports.checkUserToken = async (req, res, next) => {
  try {
    const token = req.headers["smart-user-token"];

    if (!token)
      throw {
        message: "User token is required",
        statusCode: 404
      };

    const verifyToken = await verifyBcryptHash(req.body.userEmail, token);

    if (verifyToken) {
      return next();
    }

    res.status(401).send({
      message: "Invalid user token",
      satusCode: 401
    });
    
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).send({
      message: error.message,
      statusCode: status
    });
  }
};
