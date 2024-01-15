const express = require("express");
const cookieParser = require("cookie-parser");
const connectMongooseDB = require("./lib/mongoose/mongoose.connect");
const { validateAuthorizationToken } = require("./middlewares/secureRequestCalls/checkAuthorizationToken");
require("dotenv").config();

const app = express();

// Regular middlewares
app.use(express.json());
app.use(cookieParser());

// Connecting to mongodb
connectMongooseDB();

app.get("/", validateAuthorizationToken, (req, res) => {
    res.send("Hello, Working fine!!");
});

app.use("/api/auth", require("./routers/auth/auth.router"));
app.use("/api/check", require("./routers/check/check.router"));

app.listen(5000, () => {
    console.log("Server started at port 5000");
});

module.exports = app;
