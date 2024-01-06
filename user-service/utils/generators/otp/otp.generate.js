const { createBcryptHash } = require("../../Auth/Bcrypt/createHash");

exports.generateOTP = async (length) => {
  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const { ciperText, isError, error } = await createBcryptHash(`${OTP}`);

    console.log({ error });

    if (isError)
      throw {
        message: "Something went wrong while generating Hash OTP",
        isError
      };

    return {
      OTP,
      ciperOTP: ciperText,
      error: null
    };
  } catch (error) {
    return {
      error: error.message,
      isError: error.isError,
      ciperOTP: null
    };
  }
};
