const http = require("http"); // Using http to create server
const normalizePort = require("normalize-port"); // Fancy port normalizing module
const app = require("../app.js");
const logger = require("pino")(); // Fancy logger

const projectName = "DEX METRICTS PROVIDER";

const port = normalizePort(process.env.API_PORT || 3000);

// Create server
const server = http.createServer(app);

// Open server
server.listen(port);

// Handle server errors
server.on("error", (err) => {
  logger.fatal(new Error(err));
});

server.on("listening", () =>
  console.log(`${projectName} API server started on: 127.0.0.1:${port}`)
);

module.exports = server;
