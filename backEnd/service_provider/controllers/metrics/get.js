
const createError = require("http-errors"); //error creator module
const pairSchema = require("../../mongooseModels");

const { responseStatus } = require("../../utilities");

async function getMetrics(pairAdress, fromDate, toDate) {
  let metrics = {};
  try {
    metrics = await pairSchema
      .findOne({
        pairAdress: pairAdress,
        "snapshot.date": {
          $gte: fromDate,
          $lt: toDate,
        },
      })
      .select("pairAdress token0 token1 date sonapshots -_id");
    if (!metrics) {
      return responseStatus(false, `Pair address has not been fould`, null);
    }
    return responseStatus(true, `Pair metrics successfully found`, user);
  } catch (err) {
    return responseStatus(
      false,
      "There was an error finding the pair metrics" + err.message,
      createError(500, err.message)
    );
  }
}

module.exports = { getMetrics };
