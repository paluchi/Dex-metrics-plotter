require("dotenv").config();
const logger = require("pino")();
const morgan = require("morgan");
const loaders = require("./loaders");
const router = require("./router/router");
const express = require("express");
const { generalErrorhandler } = require("./utilities");

// Catch unhanded promise errors
process.on("unhandledRejection", (error) => {
  logger.warn("unhandledRejection: " + error);
});

//process.env.NODE_ENV = 'production' //hide stack trace

const app = express();

//loads functional middlerwares
loaders(app);

//use morgar for router request logging
app.use(morgan("dev"));

//loads router
router(app);

//error handler middleware
app.use(generalErrorhandler);

module.exports = app;
