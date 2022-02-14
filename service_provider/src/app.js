require("dotenv").config();
const logger = require("pino")();
const morgan = require("morgan");
const runLoaders = require("./loaders");
const router = require("./router/router");
const express = require("express");
const loadRequestConfig = require("./requestConfig");
const { generalErrorhandler } = require("./utilities");

// Catch unhanded promise errors
process.on("unhandledRejection", (error) => {
  logger.warn("unhandledRejection: " + error);
});

//process.env.NODE_ENV = 'production' //hide stack trace

// Loads functional libraries
runLoaders();

// Load express express and commong middlewares
const app = express();

// stablish allowed headers, methods and cors policy
loadRequestConfig(app);

//use morgar for router request logging
app.use(morgan("dev"));

//loads router
router(app);

//error handler middleware
app.use(generalErrorhandler);

module.exports = app;
