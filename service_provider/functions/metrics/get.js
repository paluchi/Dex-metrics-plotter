const controllers = require("../../controllers");

async function getMetrics({ pairAdress, fromUnixTS, toUnixTS }) {
  return await controllers.metrics.get(pairAdress, fromUnixTS, toUnixTS);
}

module.exports = getMetrics;
