const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTodo = async (req, res) => {
  try {
    const { email, userId } = req;
    const { todoTitle, todoDescription, expireAt, category, isExpirable } =
      req.body;

    const insert = await prisma.todos.create({
      data: {
        userId,
        todoTitle,
        todoDescription,
        expireAt,
        isExpirable,
        category
      }
    });
    res.send(insert);
  } catch (error) {
    console.log(error);
  }
};
