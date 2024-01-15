// Import PrismaClient and Prisma namespace from the Prisma client package
const { PrismaClient, Prisma } = require("@prisma/client");

// Create an instance of PrismaClient
const prisma = new PrismaClient();

exports.updateTodoStatusToCompleted = async (req, res) => {
    try {
        // Extract relevant data from the request object
        const { userId } = req;
        const { taskIds } = req.body;

        console.log("hello");

        // Add the todo data to the database using Prisma's create method
        const addToDatabase = await prisma.todos.updateMany({
            data: {
                done: true
            },
            where: {
                userId,
                id: {
                    in: taskIds
                }
            }
        });

        // Send a successful response with the created todo
        return res.status(200).send({
            message: "Task completed",
            isTaskCompleted: true,
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
