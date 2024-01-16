const express = require("express");
const { validateAuthorizationToken } = require("./middlewares/authorization/checkAuthorizationToken");
require("dotenv").config();

const app = express();
const PORT = 6000;

app.use(express.json());
app.use(validateAuthorizationToken);

app.use("/api/todo", require("./routers/todo/todo.router"));
app.use("/api/project", require("./routers/project/project.router"));
app.use("/api/analysis", require("./routers/project/project.router"));

app.listen(PORT, () => {
    console.log("Todo service started on 6000");
});

module.exports = app;
