const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.deleteMany = async (req, res) => {
    try {
        const { userId } = req;
        console.log(userId);
        const taskIds = req.query.tasks.split(",");
        console.log({ taskIds });
        const deleteTasks = await prisma.todos.deleteMany({
            where: {
                id: {
                    in: taskIds
                },
                AND: {
                    userId: userId
                }
            }
        });

        res.status(200).send(deleteTasks);
    } catch (error) {
        console.log(error);
        const status = error.statusCode || 500;
        res.status(status).send({
            message: error.message,
            statusCode: status
        });
    }
};
