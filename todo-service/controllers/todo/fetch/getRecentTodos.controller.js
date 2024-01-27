const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { formartTodos } = require("../../../utils/helpers/formatTodoSearchResult");

/**
 * Controller function to get recent todos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Asynchronous function with no explicit return value
 */

exports.getRecentTodos = async (req, res) => {
    const { count } = req.query;
    const { userId } = req;
    console.log({ userId });
    const date = new Date().setHours(23, 59, 59, 999);
    const todaysDate = new Date(date);

    try {
        const recentResults = await prisma.todos.findMany({
            where: {
                userId,
                done: false,
                expireAt: {
                    gte: todaysDate
                }
            },
            orderBy: {
                expireAt: "asc"
            },
            take: Number(count)
        });

        return res.status(200).send(recentResults);
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).send({
            message: error.message,
            statusCode: status
        });
    }
};
