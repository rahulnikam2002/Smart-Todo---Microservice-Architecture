// Import PrismaClient and Prisma namespace from the Prisma client package
const { PrismaClient, Prisma } = require("@prisma/client");

// Create an instance of PrismaClient
const prisma = new PrismaClient();

/**
 * Create a new todo.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the todo is created.
 */
exports.createTodo = async (req, res) => {
    try {
        // Extract relevant data from the request object
        const { userId } = req;
        const { todoTitle, todoDescription, expireAt, category, isExpirable } = req.body;

        // Add the todo data to the database using Prisma's create method
        const addToDatabase = await prisma.todos.create({
            data: {
                userId,
                todoTitle,
                todoDescription,
                expireAt,
                done: false,
                isExpirable,
                category
            }
        });

        // Send a successful response with the created todo
        return res.status(200).send({
            message: "Task created",
            isTaskCreated: true,
            task: addToDatabase,
            statusCode: 200
        });
    } catch (error) {
        let message, statusCode;

        console.log(error);
        // Handle Prisma validation errors
        if (error instanceof Prisma.PrismaClientValidationError) {
            message = "Validation failed";
            statusCode = 422;
        } else {
            message = "Server issue";
            statusCode = 500;
        }
        res.status(statusCode).send({
            message: message,
            statusCode: statusCode
        });
    }
};
