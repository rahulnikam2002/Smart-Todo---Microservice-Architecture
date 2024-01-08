const redisClient = require("../../lib/redis/redis.connect");
const { OTPtemplate } = require("../../templates/otp/otp.template");
const { createBcryptHash } = require("../../utils/Auth/Bcrypt/createHash");
const { generateOTP } = require("../../utils/generators/otp/otp.generate");
const { sendMail } = require("../../utils/mails/sendMail");
const { checkInRedis } = require("../../utils/redis/checkInRedis");

/**
 * Controller function to send OTP to a user's email.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating OTP status.
 */

exports.sendOTP = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Check if OTP has already been sent for the given email
    const redisKey = `${userEmail}_OTP`;
    const { value: redisValue, isError: isRedisError } = await checkInRedis(redisKey);

    if (isRedisError)
      throw {
        message: "Something went wrong with the cache"
      };

    if (redisValue) {
      throw {
        message: "OTP already sent!",
        statusCode: 409
      };
    }

    // Generate OTP
    const { cipherOTP, OTP, error: otpError, isError: generateOTPError } = await generateOTP(6);

    if (generateOTPError)
      throw {
        message: "Error while generating OTP"
      };

    // Prepare mail options for sending OTP
    const mailOptions = {
      from: "Rahul Nikam <noreply@bookingbreeze.in>",
      to: [userEmail],
      subject: "OTP for your new account | Smart Todo",
      html: OTPtemplate(OTP)
    };

    // Send OTP via email
    const { value: sendMailData, isError: isErrorInSendMail } = await sendMail(mailOptions);

    if (isErrorInSendMail)
      throw {
        message: "Mail not sent"
      };

    // Cache the OTP in Redis
    const cacheOTP = await redisClient
      .pipeline()
      .set(redisKey, JSON.stringify({ userEmail, cipherOTP }))
      .expire(redisKey, 180)
      .exec();

    // Hash the user's email for generating a token
    const hashEmail = await createBcryptHash(userEmail);

    return res.status(200).json({
      otpSent: true,
      message: "OTP sent successfully",
      statusCode: 200,
      token: hashEmail.cipherText
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      otpSent: false,
      message: error.message,
      statusCode
    });
  }
};
