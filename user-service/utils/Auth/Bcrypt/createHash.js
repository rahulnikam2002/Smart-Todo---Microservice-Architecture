const { hash } = require("bcrypt");

exports.createBcryptHash = async (data) => {
  try {
    const ciperText = await hash(data, 10);
    return {
      ciperText,
      isError: false,
      error: null
    };
  } catch (error) {
    return { error, isError: true };
  }
};
