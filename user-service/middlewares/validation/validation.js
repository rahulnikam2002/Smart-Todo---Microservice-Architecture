const validateData = require("../../utils/validation/validation");

exports.validation = (schema) => {
  return async (req, res, next) => {
    console.log(req)
    try {
      const data = req.body;
      const { value, error, isError } = validateData(data, schema);
      console.log(value, error, isError )
      if (isError) {
        throw {
          message: "Validation Failed",
          error,
          type: "Validation::error",
          statusCode: 400
        };
      }
      return next();
    } catch (error) {
      const statusCode = error.statusCode ? error.statusCode : 500;
      return res.status(statusCode).send(error);
    }
  };
};
