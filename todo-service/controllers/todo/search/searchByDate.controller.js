const { PrismaClient } = require("@prisma/client");
const { formartTodos } = require("../../../utils/helpers/formatTodoSearchResult");

// Instantiate the Prisma client
const prisma = new PrismaClient();

/**
 * Searches todos by date and formats the search results into expired and pending tasks.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} A promise that resolves with the formatted search result or rejects with an error.
 */

exports.searchTodoByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const { userId } = req;

        const dateToBeSearch = new Date(date).toISOString().split("T")[0];

        const searchResults = await prisma.todos.findMany({
            where: {
                expireAt: {
                    gte: new Date(`${dateToBeSearch}T00:00:00.000Z`), // Start of the day
                    lte: new Date(`${dateToBeSearch}T23:59:59.999Z`) // End of the day
                },
                AND: {
                    userId: userId
                }
            }
        });

        // Format the search results into expired and pending tasks
        const formattedSearchResult = formartTodos(searchResults);

        res.status(200).send(formattedSearchResult);
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).send({
            message: error.message,
            status: status
        });
    }
};
