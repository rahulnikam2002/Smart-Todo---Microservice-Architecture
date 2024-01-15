const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
    try {
        const { userId } = req;
        const { projectName, projectDescription, expireAt, category, todos } = req.body;

        const doProjectAlreadyExist = await checkProjectExist(userId, projectName);
        console.log({ doProjectAlreadyExist });

        if (doProjectAlreadyExist)
            throw {
                message: "Project with same name exist, try creating new one",
                statusCode: 409
            };

        for (i = 0; i < todos.length; i++) {
            todos[i].userId = userId;
            delete todos[i].userEmail;
        }

        const createNewProject = await prisma.projects.create({
            data: {
                userId,
                projectName,
                projectDescription,
                expireAt,
                category,
                todos: {
                    create: todos
                }
            },
            include: {
                todos: true
            }
        });

        res.status(200).send(createNewProject);
    } catch (error) {
        let message,
            statusCode = error.statusCode || 500;

        console.error(error);

        // Handle Prisma validation errors
        if (error instanceof Prisma.PrismaClientValidationError) {
            message = "Validation failed";
            statusCode = 422;
        } else {
            message = error.message ? error.message : "Server issue";
            statusCode = 500;
        }
        res.status(statusCode).send({
            message: message,
            statusCode: statusCode
        });
    } finally {
        await prisma.$disconnect();
    }
};

const checkProjectExist = async (userId, projectName) => {
    try {
        const doExist = await prisma.projects.findFirst({
            where: {
                userId,
                projectName
            }
        });

        console.table(doExist);

        if (doExist) return true;

        return false;
    } catch (error) {
        return false;
    }
};
