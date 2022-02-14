require("dotenv").config(); // Loads .env variables as environment variables
const logger = require("pino")();
const morgan = require("morgan"); // Fancy request logging module 
const runLoaders = require("./loaders");
const router = require("./router/router");
const express = require("express"); // Express as web framework
const loadRequestConfig = require("./requestConfig"); // Used to set allowed request parameters and policies
const { generalErrorhandler } = require("./utilities"); // Used to handle errors at last step of request pipeline

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
