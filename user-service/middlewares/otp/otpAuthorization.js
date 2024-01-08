const validateData = require("../../utils/validation/validation");
const {
  OTPVerificationSchema
} = require("../../utils/validation/schemas/otpVerification.vschema");
const { verifyBcryptHash } = require("../../utils/Auth/Bcrypt/verifyHash");

exports.OTPAuthorization = async (req, res, next) => {
  try {
    const { otp, userEmail } = req.body;

    if (!otp || !userEmail)
      throw {
        message: "OTP and Email id is required",
        statusCode: 404
      };

    const otpString = String(otp);

    const { value, isError, error } = validateData(
      { otp: otpString, userEmail },
      OTPVerificationSchema
    );

    if (isError)
      throw {
        message: "Invalid Email or OTP",
        statusCode: 401
      };

    const optToken = req.headers["x-otp-token"];

    if (!optToken)
      throw {
        message: "x-otp-token in required"
      };

    const isTokenVerified = await verifyBcryptHash(userEmail, optToken);
    console.log({ isTokenVerified });

    if (!isTokenVerified)
      throw {
        message: "Unverified token",
        code: 401
      };
    return next();
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send({
      message: error.message,
      code: error.statusCode
    });
  }
};
