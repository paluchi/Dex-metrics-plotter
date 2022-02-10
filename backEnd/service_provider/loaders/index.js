const logger = require("pino")(); //logger module
const expressLoader = require("./express");
const DBLoader = require("./mongodbLoader");

module.exports = function init(expressApp) {
  DBLoader().then(() => {
    logger.info("db Intialized");
    expressLoader(expressApp);
    logger.info("Express Intialized");
  });
};
