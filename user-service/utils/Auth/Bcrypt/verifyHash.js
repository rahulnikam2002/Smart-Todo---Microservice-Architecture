const { compare } = require("bcrypt");

exports.verifyBcryptHash = async (plainText, ciperText) => {
  const isVerified = await compare(plainText, ciperText);
  return isVerified;
};
