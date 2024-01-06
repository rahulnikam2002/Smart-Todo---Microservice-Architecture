const redisClient = require("../../lib/redis/redis.connect");

const checkInRedis = async (key) => {
  try {
    if (!key) {
      throw {
        error: "Redis key is required",
        isError: true,
        value: null
      };
    }

    const value = await redisClient.get(key);

    return {
      error: null,
      value,
      isError: false
    };
  } catch (error) {
    return {
      error: error.error,
      isError: true,
      value: null
    };
  }
};

module.exports = checkInRedis;
