const { PrismaClient } = require("@prisma/client");
const { formartTodos } = require("../../../utils/helpers/formatTodoSearchResult");

// Instantiate the Prisma client
const prisma = new PrismaClient();

/**
 * Searches todos by category and formats the search results into expired and pending tasks.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} A promise that resolves with the formatted search result or rejects with an error.
 */
exports.searchTodoByCategory = async (req, res) => {
    try {
        const { categories } = req.query;
        const { userId } = req;

        // Split the comma-separated titles into an array
        const categoryArray = categories.split(",");

        const searchResults = await prisma.todos.findMany({
            where: {
                category: {
                    hasSome: categoryArray
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
