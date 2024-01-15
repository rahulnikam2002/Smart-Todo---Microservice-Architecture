const Joi = require("joi");
const { singleTodoSchema } = require("./singleTodo.vschema");

exports.newProjectSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    projectName: Joi.string().min(2).required(),
    projectDescription: Joi.string(),
    category: Joi.array(),
    expireAt: Joi.string(),
    todos: Joi.array().items(singleTodoSchema.required()).required()
});
