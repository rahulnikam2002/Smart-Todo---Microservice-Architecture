/**
 *
 * @param {*} req
 * @param {*} res
 *
 *  is user aleady present? in Cache and then in database
 *  if no! -> register
 *  else -> res
 * 
 */

const checkInRedis = require("../../utils/redis/checkInRedis");

exports.signUp = async (req, res) => {
  const { userEmail } = req.body;

  const a = await checkInRedis(userEmail);
  return res.send(a);
};
