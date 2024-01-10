"use strict";

const ServerlessHttp = require("serverless-http");
const app = require("./app");

module.exports.startup = ServerlessHttp(app);
