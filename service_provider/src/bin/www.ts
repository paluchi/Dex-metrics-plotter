import * as http from "http"; // Using http to create server
import app from "../app";

const projectName = "DEX METRICTS PROVIDER";

// Use API_PORT if exists in environment or use 3000 as port
const port: number =
  (process.env.API_PORT && parseInt(process.env.API_PORT)) || 3000;

// Create server
const server: http.Server = http.createServer(app);

// Open server
server.listen(port);

// Handle server errors
server.on("error", (err: string) => {
  console.log(err);
  throw new Error(err);
});

server.on("listening", () =>
  console.log(`${projectName} API server started on: 127.0.0.1:${port}`)
);

export = server;
