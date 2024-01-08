const { compare } = require("bcryptjs");
const { checkInRedis } = require("../../utils/redis/checkInRedis");
const userModel = require("../../models/user/user.model");
const { createJWT } = require("../../utils/Auth/JWT/createJWT");

exports.signIn = async (req, res) => {
  const { userEmail } = req;
  const { userPassword: originalPassword } = req.body;

  const isCached = await checkInRedis(userEmail);
  let isValidUser;
  let userDataFromDB;

  let dataForJWT;

  if (isCached.value) {
    const cachedValue = JSON.parse(isCached.value);
    isValidUser = await verifyPassword(
      originalPassword,
      cachedValue.userPassword
    );
    const { userPassword, userNumber, ...restData } = cachedValue;
    dataForJWT = restData;
  } else {
    userDataFromDB = await userModel.findOne({ userEmail });
    isValidUser = await verifyPassword(
      originalPassword,
      userDataFromDB.userPassword
    );
    const { userPassword, userNumber, ...restData } = userDataFromDB._doc;
    dataForJWT = restData;
  }

  const token = createJWT(dataForJWT, process.env.AUTH_TOKEN_SECRET, "30d");
  return res.send({
    userLoggedIn: true,
    message: "Success log in",
    token: token.value
  });
};

const verifyPassword = async (plainPassword, ciperPassword) => {
  try {
    if (!plainPassword || !ciperPassword) {
      throw {
        message: "Paramerters are required",
        passwordVerified: false
      };
    }

    const comparePassword = await compare(plainPassword, ciperPassword);

    if (comparePassword) {
      return {
        message: "Correct password",
        passwordVerified: true
      };
    }

    return {
      message: "Incorrect password",
      passwordVerified: false
    };
  } catch (error) {
    return {
      message: error.message,
      passwordVerified: error.passwordVerified
    };
  }
};
