const { sign } = require("jsonwebtoken");

exports.createJWT = (payload, secret, expiresIn = "1d") => {
  try {
    if (!payload || !secret)
      throw {
        message: "payload and secret are required",
        isError: true,
        value: null
      };
    const token = sign(payload, secret, {
      expiresIn
    });

    if (!token)
      throw {
        message: "Something went wrong",
        isError: true,
        value: null
      };

    return {
      error: null,
      isError: true,
      value: token
    };
    
  } catch (error) {
    return {
      error: error.message,
      isError: error.isError,
      value: error.value
    };
  }
};
