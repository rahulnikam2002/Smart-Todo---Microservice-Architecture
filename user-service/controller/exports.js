const { signIn } = require("./auth/signin.controller");
const { signUp } = require("./auth/signup.controller");

exports.controller = {
  signIn,
  signUp
};
