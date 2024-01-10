const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 6000;

app.use(express.json());

app.use("/api/todo", require("./routers/todo/todo.router"));

app.listen(PORT, () => {
  console.log("Todo service started on 6000");
});

module.exports = app;
