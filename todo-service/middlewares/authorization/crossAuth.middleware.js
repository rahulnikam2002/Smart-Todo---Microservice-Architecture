const redisClient = require("../../lib/redis/redis.connect");
const { checkInRedis } = require("../../utils/redis/checkInRedis");
const { default: axios } = require("axios");

exports.authorizeCrossServiceRequest = async (req, res, next) => {
    try {
        const userEmail = req.headers["user-auth-email"];
        const authToken = req.headers["smart-auth-token"];
        let details;

        console.log("Token you received =>", { authToken, userEmail });

        if (!authToken)
            throw {
                message: "smart-auth-token is required from Headers",
                statusCode: 404
            };

        const redisKey = `${userEmail}::authorization_Cache`;
        const { value, isError, error } = await checkInRedis(redisKey);

        if (value) {
            const redisData = JSON.parse(value);
            console.log("Fromare fetching from redis");
            details = redisData.tokenInformation;
        } else {
            const { userDetails, error: userDetailsError } = await getUserDetails(authToken);

            if (userDetailsError || !userDetails.isTokenValid) {
                throw {
                    message: "something went wrong!",
                    statusCode: 500
                };
            }

            console.log("Fromare fetching from diff service");

            details = userDetails.tokenInformation;
            await redisClient.pipeline().set(redisKey, JSON.stringify(userDetails)).expire(redisKey, 86400).exec();
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
            "https://f0cmn59npa.execute-api.ap-south-1.amazonaws.com/dev/api/check/jwt",
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
