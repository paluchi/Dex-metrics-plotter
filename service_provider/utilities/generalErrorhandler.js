const logger = require("pino")(); //logger module

function generalErrorhandler(
  err,
  req,
  res,
  next
) {
  res.status(err.status).send(err.message);
  logger.error(err.message);
};

module.exports = generalErrorhandler
