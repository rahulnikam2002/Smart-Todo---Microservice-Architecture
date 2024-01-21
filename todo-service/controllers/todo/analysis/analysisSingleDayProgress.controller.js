// Import PrismaClient and Prisma namespace from the Prisma client package
const { PrismaClient, Prisma } = require("@prisma/client");

// Create an instance of PrismaClient
const prisma = new PrismaClient();

exports.analysisSingleDayProgress = async (req, res) => {
    try {
        const { userId } = req;
        const { date } = req.query;
        const newDate = new Date(date);
        newDate.setUTCHours(23, 59, 59, 999);
        console.log({ newDate });

        const getAllTodos = await prisma.$transaction([
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: {
                        equals: newDate
                    },
                    done: true
                }
            }),
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: {
                        equals: newDate
                    }
                }
            })
        ]);

        const percentageAnalysis = calculatePercentage(getAllTodos[0], getAllTodos[1]);

        res.status(200).send({ toalTasks: getAllTodos[1], completedTasks: getAllTodos[0], percentage: Number(percentageAnalysis.toFixed(2)) });
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).send({
            message: error.message,
            statusCode: status
        });
    }
};

const calculatePercentage = (totalCompleted, total) => {
    const percentage = (totalCompleted / total) * 100;
    return percentage ? percentage : 0;
};
