const http = require("http");
const normalizePort = require('normalize-port');
const app = require("../app.js");
const logger = require("pino")();

const projectName = "DEX METRICTS PROVIDER"

const port = normalizePort(process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {logger.fatal(new Error(err))});
server.on('listening', () => console.log(`${projectName} API server started on: 127.0.0.1:${port}`));

module.exports=server;

