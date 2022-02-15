import 'dotenv/config' // Loads .env variables as environment variables
import morgan from "morgan"; // Fancy request logging module
import runLoaders from "./loaders";
import router from "./router/router";
import express, { Application } from "express"; // Express as web framework
import loadRequestConfig from "./requestConfig"; // Used to set allowed request parameters and policies
import { generalErrorhandler } from "./utilities"; // Used to handle errors at last step of request pipeline


// Catch unhanded promise errors
process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection: ${error}`);
});

//process.env.NODE_ENV = 'production' //hide stack trace

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
