// Import PrismaClient and Prisma namespace from the Prisma client package
const { PrismaClient, Prisma } = require("@prisma/client");

// Create an instance of PrismaClient
const prisma = new PrismaClient();

exports.updateTodo = async (req, res) => {
    try {
        // Extract relevant data from the request object
        const { userId } = req;
        const { todoTitle, todoDescription, expireAt, category, isExpirable, taskId } = req.body;

        console.log("hello");

        // Add the todo data to the database using Prisma's create method
        const addToDatabase = await prisma.todos.update({
            data: {
                userId,
                todoTitle,
                todoDescription,
                expireAt,
                done: false,
                isExpirable,
                category
            },
            where: {
                userId,
                id: taskId
            }
        });

        // Send a successful response with the created todo
        return res.status(200).send({
            message: "Task updated",
            isTaskUpdated: true,
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
