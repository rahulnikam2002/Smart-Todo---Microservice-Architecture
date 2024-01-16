const { createTodo } = require("./todo/create/createTodo.controller");
const { createProject } = require("./project/project.controller");
const { searchTodoByName } = require("./todo/search/searchByName.controller");
const { searchTodoByCategory } = require("./todo/search/searchByCategory.controller");
const { searchTodoByDate } = require("./todo/search/searchByDate.controller");
const { fetchAllTodos } = require("./todo/fetch/fetchAllTodos.controller");
const { deleteMany } = require("./todo/delete/delete.controller");
const { updateTodo } = require("./todo/update/updateTodo.controller");
const { updateTodoStatusToCompleted } = require("./todo/update/todoStatus.controller");
const { analysisSingleDayProgress } = require("./todo/analysis/analysisSingleDayProgress.controller");

exports.contorllers = {
    createTodo,
    createProject,
    searchTodoByName,
    searchTodoByCategory,
    searchTodoByDate,
    fetchAllTodos,
    deleteMany,
    updateTodo,
    updateTodoStatusToCompleted,
    analysisSingleDayProgress
};
