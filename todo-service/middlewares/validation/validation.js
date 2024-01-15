const validateData = require("../../utils/validation/validation");

/**
 *
 * @param {*} schema
 * @returns
 */
exports.validation = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const { value, error, isError } = validateData(data, schema);
            console.log(error, isError);
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
