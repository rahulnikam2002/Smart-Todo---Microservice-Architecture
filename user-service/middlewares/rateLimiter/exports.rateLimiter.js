const {
  sendOtp_RateLimiter,
  signIn_RateLimiter,
  signUp_RateLimiter,
  verifyOtp_RateLimiter
} = require("./rateLimiter");

exports.rateLimiterFunctions = {
  sendOtp_RateLimiter,
  verifyOtp_RateLimiter,
  signUp_RateLimiter,
  signIn_RateLimiter
};
