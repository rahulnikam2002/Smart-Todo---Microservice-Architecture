const { compare } = require("bcryptjs");
const { checkInRedis } = require("../../utils/redis/checkInRedis");
const userModel = require("../../models/user/user.model");
const { createJWT } = require("../../utils/Auth/JWT/createJWT");

exports.signIn = async (req, res) => {
    try {
        console.log("Started");
        const { userEmail } = req;
        const { userPassword: originalPassword } = req.body;
        console.log("Password received");
        const isCached = await checkInRedis(userEmail);
        let isValidUser;
        let userDataFromDB;
        console.log("Cached checked!", { isCached });
        let dataForJWT;

        if (isCached.value) {
            const cachedValue = JSON.parse(isCached.value);
            isValidUser = await verifyPassword(originalPassword, cachedValue.userPassword);

            console.log("Verified passwrod from cache value ==> ", isValidUser);
            const { userPassword, userNumber, ...restData } = cachedValue;
            console.log("Data found in cache", { userPassword, userNumber, ...restData });
            dataForJWT = restData;
        } else {
            console.log("Not is cached");
            userDataFromDB = await userModel.findOne({ userEmail });
            isValidUser = await verifyPassword(originalPassword, userDataFromDB.userPassword);

            const { userPassword, userNumber, ...restData } = userDataFromDB._doc;
            console.log("Data received from database", { userPassword, userNumber, ...restData });
            dataForJWT = restData;
        }

        if (!isValidUser.passwordVerified) {
            throw {
                userLoggedIn: false,
                message: "Incorrect passwords",
                statusCode: 401
            };
        }

        const token = createJWT(dataForJWT, process.env.AUTH_TOKEN_SECRET, "30d");
        return res.status(200).send({
            userLoggedIn: true,
            message: "Success log in",
            token: token.value,
            userDetails: dataForJWT
        });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).send({
            message: error.message,
            userLoggedIn: false
        });
    }
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
