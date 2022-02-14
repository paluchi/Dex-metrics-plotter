const controllers = require("../../controllers");

// As a very simple functionality just return the required data
async function getByDateRange({ pairAdress, fromDate, toDate }) {
  return await controllers.metrics.getByDateRange(
    pairAdress,
    fromDate,
    toDate
  );
}

module.exports = getByDateRange;
