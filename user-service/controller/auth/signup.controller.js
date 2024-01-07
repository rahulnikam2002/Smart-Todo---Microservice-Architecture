const redisClient = require("../../lib/redis/redis.connect");
const userModel = require("../../models/user/user.model");
const {
  welcomeEmailTemplate
} = require("../../templates/welcome/welcome.template");
const { createBcryptHash } = require("../../utils/Auth/Bcrypt/createHash");
const { createJWT } = require("../../utils/Auth/JWT/createJWT");
const { sendMail } = require("../../utils/mails/sendMail");

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
    console.log({ hello: true });
    const { userEmail, userPassword: originalPassword } = req.body;

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

    const { ciperText } = await createBcryptHash(originalPassword);

    if (!ciperText)
      throw {
        message: "Something went wrong while generating ciper password",
        statusCode: 500
      };

    const userObject = {
      ...req.body,
      userPassword: ciperText
    };

    const addToDatabase = await userModel.create(userObject);

    if (!addToDatabase)
      throw {
        message: "Something went wrong while creating account",
        statusCode: 500
      };

    const { userPassword, userNumber, ...restData } = addToDatabase._doc;

    const { value } = createJWT(restData, process.env.AUTH_TOKEN_SECRET, "30d");

    await redisClient
      .pipeline()
      .set(userEmail, JSON.stringify(addToDatabase))
      .expire(userEmail, 2592000)
      .exec();

    res.status(201).send({
      accountCreated: true,
      statusCode: 200,
      userData: restData,
      userToken: value
    });

    const welcomeMailObject = {
      from: "Rahul Nikam <support.care@bookingbreeze.in>",
      to: [userEmail],
      subject: `Hey ${
        restData.userName.split(" ")[0]
      }, Welcome to Smart Todo! 🚀`,
      html: welcomeEmailTemplate(restData.userName)
    };

    await sendMail(welcomeMailObject);
    return;
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
