// Import PrismaClient and Prisma namespace from the Prisma client package
const { PrismaClient, Prisma } = require("@prisma/client");

// Create an instance of PrismaClient
const prisma = new PrismaClient();

exports.quickReports = async (req, res) => {
    try {
        const { userId } = req;
        let date = new Date();
        date.setUTCHours(23, 59, 59, 999);

        const todaysDate = new Date(date);
        console.log({ todaysDate });
        const tomorrowsDate = new Date(date.setDate(date.getDate() + 1));

        let today = new Date();
        let currentDay = today.getDay();
        let daysUntilSunday = 7 - currentDay;
        let comingSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSunday);
        comingSunday.setHours(23, 59, 59, 999);

        const getQuickReportQuery = await prisma.$transaction([
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: todaysDate,
                    done: true
                }
            }),
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: todaysDate
                }
            }),
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: tomorrowsDate,
                    done: true
                }
            }),
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: tomorrowsDate
                }
            }),
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: {
                        gte: todaysDate,
                        lte: comingSunday
                    },
                    done: true
                }
            }),
            prisma.todos.count({
                where: {
                    userId,
                    expireAt: {
                        gte: todaysDate,
                        lte: comingSunday
                    }
                }
            })
        ]);

        const tasksPercentages = {
            todays: {
                title: "Today",
                date: `${todaysDate.getUTCDate()} ${date.toLocaleString("default", { month: "short" })}`,
                completed: getQuickReportQuery[0],
                total: getQuickReportQuery[1],
                percentage: Number(calculatePercentage(getQuickReportQuery[0], getQuickReportQuery[1]).toFixed())
            },
            tomorrow: {
                title: "Tomorrow",
                date: `${tomorrowsDate.getUTCDate()} ${comingSunday.toLocaleString("default", { month: "short" })}`,
                completed: getQuickReportQuery[2],
                total: getQuickReportQuery[3],
                percentage: Number(calculatePercentage(getQuickReportQuery[2], getQuickReportQuery[3]).toFixed())
            },
            weekend: {
                title: "Weekend",
                date: `${comingSunday.getUTCDate()} ${date.toLocaleString("default", { month: "short" })}`,
                completed: getQuickReportQuery[4],
                total: getQuickReportQuery[5],
                percentage: Number(calculatePercentage(getQuickReportQuery[4], getQuickReportQuery[5]).toFixed())
            }
        };

        res.status(200).send({ tasksPercentages });
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
