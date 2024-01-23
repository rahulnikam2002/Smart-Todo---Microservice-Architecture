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
    try {
        const recentResults = await prisma.todos.findMany({
            where: {
                userId
            },
            take: Number(count)
        });

        const formattedResults = formartTodos(recentResults);
        return res.status(200).send(formattedResults);
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).send({
            message: error.message,
            statusCode: status
        });
    }
};
