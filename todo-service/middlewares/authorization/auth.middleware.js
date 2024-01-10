const redisClient = require("../../lib/redis/redis.connect");
const { checkInRedis } = require("../../utils/redis/checkInRedis");
const { default: axios } = require("axios");

exports.authorizeRequest = async (req, res, next) => {
  try {
    const { authToken, userEmail } = req.body;
    let details;

    if (!authToken)
      throw {
        message: "Auth token is required from body",
        statusCode: 404
      };

    const redisKey = `${userEmail}::authorization_Cache`;
    const { value, isError, error } = await checkInRedis(redisKey);
    console.log({ redisValue: value });

    if (value) {
      const redisData = JSON.parse(value);
      console.log("Fromare fetching from redis");
      details = redisData.tokenInformation;
    } else {
      const { userDetails, error: userDetailsError } = await getUserDetails(
        authToken
      );

      if (userDetailsError || !userDetails.isTokenValid) {
        throw {
          message: "something went wrong!",
          statusCode: 500
        };
      }

      console.log("Fromare fetching from diff service");

      details = userDetails.tokenInformation;
      await redisClient
        .pipeline()
        .set(redisKey, JSON.stringify(userDetails))
        .expire(redisKey, 86400)
        .exec();
    }

    // console.log(userDetails);
    req.email = details.email;
    req.userId = details._id;

    return next();
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).send({
      message: error.message,
      statusCode: status
    });
  }
};

const getUserDetails = async (token) => {
  try {
    console.log({ token: "Bearer " + process.env.GLOBAL_AUTH_TOKEN });

    const userDetails = await axios.post(
      "http://localhost:5000/api/check/jwt",
      {
        jwtToken: token
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.GLOBAL_AUTH_TOKEN
        }
      }
    );

    return { userDetails: userDetails.data, error: null };
  } catch (error) {
    return {
      userDetails: null,
      error: error.response
    };
  }
};
