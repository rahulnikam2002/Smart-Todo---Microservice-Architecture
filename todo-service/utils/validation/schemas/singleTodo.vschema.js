const Joi = require("joi");

exports.singleTodoSchema = Joi.object({
    todoTitle: Joi.string().required(),
    todoDescription: Joi.string().allow("").optional(),
    expireAt: Joi.string(),
    category: Joi.array().allow("").optional(),
    isExpirable: Joi.boolean().optional()
});

exports.updateTodoSchema = Joi.object({
    todoTitle: Joi.string().required(),
    todoDescription: Joi.string().allow("").optional(),
    expireAt: Joi.string(),
    category: Joi.array().allow("").optional(),
    taskId: Joi.string().required(),
    isExpirable: Joi.boolean().optional()
});
