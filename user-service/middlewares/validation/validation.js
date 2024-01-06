const { validateEmail } = require("../../utils/validation/validation");

exports.validation = async (req, res, next) => {
  const { email } = req.body;

  const a = validateEmail(email);

  if (a) {
    return next();
  }
  return res.send("Validation failed");
};
