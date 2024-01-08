const redisClient = require("../../lib/redis/redis.connect");
const { OTPtemplate } = require("../../templates/otp/otp.template");
const { createBcryptHash } = require("../../utils/Auth/Bcrypt/createHash");
const { generateOTP } = require("../../utils/generators/otp/otp.generate");
const { sendMail } = require("../../utils/mails/sendMail");
const checkInRedis = require("../../utils/redis/checkInRedis");

exports.sendOTP = async (req, res) => {
  try {
    const { userEmail } = req.body;
    console.log("Hello inside", userEmail);

    // const { value, error } = await checkInRedis(userEmail);

    // if (value)
    //   throw {
    //     message: "User already exist",
    //     statusCode: 409
    //   };

    const redisKey = `${userEmail}_OTP`;

    const {
      value: redisValue,
      isError: isRedisError,
      error: redisError
    } = await checkInRedis(redisKey);

    console.log({ redisValue });

    if (isRedisError)
      throw {
        message: "Something went wrong with cache"
      };

    if (redisValue) {
      throw {
        message: "OTP Already sent!",
        statusCode: 409
      };
    }

    const {
      ciperOTP,
      OTP,
      error: otpError,
      isError: generateOTPError
    } = await generateOTP(6);

    console.log({ otpError });

    if (generateOTPError)
      throw {
        message: "Error while generating OTP"
      };

    const mailOptions = {
      from: "Rahul Nikam <noreply@bookingbreeze.in>",
      to: [userEmail],
      subject: "OTP for your new account | Smart Todo",
      html: OTPtemplate(OTP)
    };

    const {
      value: sendMaildata,
      isError: isErrorInSendMail,
      error: sendMailError
    } = await sendMail(mailOptions);

    if (isErrorInSendMail)
      throw {
        message: "Mail not send"
      };

    const cacheOTP = await redisClient
      .pipeline()
      .set(`${userEmail}_OTP`, JSON.stringify({ userEmail, ciperOTP }))
      .expire(`${userEmail}_OTP`, 180)
      .exec();

    const hashEmail = await createBcryptHash(userEmail);

    return res.status(200).send({
      otpSent: true,
      message: "OTP sent successfully",
      statusCode: 200,
      token: hashEmail.ciperText
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send({
      otpSent: false,
      message: error.message,
      statusCode
    });
  }
};
