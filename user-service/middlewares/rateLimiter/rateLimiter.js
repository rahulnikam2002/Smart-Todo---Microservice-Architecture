const { rateLimit } = require("express-rate-limit");

const restData = {
  message: {
    statusCode: 999,
    message: "Max request hit!"
  },
  standardHeaders: "draft-7",
  legacyHeaders: true,
  skipSuccessfulRequests: true,
  statusCode: 500
};

exports.sendOtp_RateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 100,
  ...restData
});

exports.verifyOtp_RateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 10,
  ...restData
});

exports.signUp_RateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  ...restData
});

exports.signIn_RateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  ...restData
});
