const controllers = require("../../controllers");

async function getByDateRange({ pairAdress, fromDate, toDate }) {
  return await controllers.metrics.getByDateRange(
    pairAdress,
    fromDate,
    toDate
  );
}

module.exports = getByDateRange;
