const userModel = require("../../models/user/user.model");

/**
 *
 * @param {*} req
 * @param {*} res
 *
 *  is user aleady present? in Cache and then in database
 *  if no! -> register
 *  else -> res
 *
 */

const checkInRedis = require("../../utils/redis/checkInRedis");

exports.signUp = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const { value: isInRedis, isError, error } = await checkInRedis(userEmail);

    if (isInRedis) {
      return res.status(409).send({
        message: "User aleady exist",
        code: 409
      });
    }

    const {
      value: userData,
      isError: isDatabaseError,
      error: databaseError
    } = await checkUserInDatabase(userEmail);

    if (isDatabaseError) {
      throw {
        message: databaseError,
        isError: true,
        value: null
      };
    }

    if (userData) {
      return res.status(404).send({
        message: "User aleady exist",
        code: 409
      });
    }

    
    
  } catch (error) {
    const statusCode = error.code || 500;
    res.status(statusCode).send({
      message: error.message || "Internal Server Error",
      code: statusCode
    });
  }
};

const checkUserInDatabase = async (userEmail) => {
  try {
    if (!userEmail)
      throw {
        error: "userEmail is required",
        value: null,
        isError: true
      };

    const userData = await userModel.findOne({ userEmail }).select("userEmail");

    return {
      value: userData,
      error: null,
      isError: false
    };
  } catch (error) {
    return {
      error: error.error,
      value: error.value,
      isError: error.isError
    };
  }
};
