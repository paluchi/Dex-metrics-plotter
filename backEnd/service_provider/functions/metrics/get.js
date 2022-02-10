const controllers = require("../../controllers");

async function getMetrics(pairAdress, fromDate, toDate) {
  return await controllers.metrics.get(pairAdress, fromDate, toDate);
}

module.exports = getMetrics;
