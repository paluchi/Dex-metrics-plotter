const logger = require("pino")(); //logger module

// Just print error and send status and message to client. Could locate a lot of distincs logics for last step in process (like send data to metrics system).
function generalErrorhandler(
  err,
  req,
  res,
  next
) {
  logger.error(err.message);
  res.status(err.status).send(err.message);
};

module.exports = generalErrorhandler
