import * as dotenv from "dotenv"; // Loads .env variables as environment variables
import morgan from "morgan"; // Fancy request logging module
import express, { Application } from "express"; // Express as web framework

import runLoaders from "./loaders";
import loadRequestConfig from "./requestConfig"; // Used to set allowed request parameters and policies
import { generalErrorhandler } from "./utilities"; // Used to handle errors at last step of request pipeline

// process.env.NODE_ENV = "production"; //hide stack trace
// must be loaded before router
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
} else {
}

import router from "./router/router";

// Catch unhanded promise errors
process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection: ${error}`);
});

// Loads functional libraries
runLoaders();

// Load express express and commong middlewares
const app: Application = express();

// stablish allowed headers, methods and cors policy
loadRequestConfig(app);

//use morgar for router request logging
app.use(morgan("dev"));

//loads router
router(app);

//error handler middleware
app.use(generalErrorhandler);

export = app;
