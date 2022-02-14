const logger = require("pino")(); //logger module
const DBLoader = require("./mongodbLoader");

module.exports = function init() {
  DBLoader(); // Create db connection
};
