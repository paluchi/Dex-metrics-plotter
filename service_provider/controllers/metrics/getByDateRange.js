const createError = require("http-errors"); //error creator module
const mongoose = require("mongoose");
const pairModel = mongoose.model("pairs");

const { status } = require("../../utilities");

async function getMetricsByDateRange(pairAdress, fromDate, toDate) {
  try {
    const metrics = await pairModel.aggregate([
      { $match: { id: pairAdress } },
      {
        $project: {
          _id: "$id",
          name: "$name",
          token0: "$token0",
          token1: "$token1",
          snapshots: {
            $filter: {
              input: "$snapshots",
              as: "ss",
              cond: {
                $and: [
                  { $gte: ["$$ss.date", fromDate] },
                  { $lte: ["$$ss.date", toDate] },
                ],
              },
            },
          },
        },
      },
    ]);

    if (!metrics) {
      return status(
        false,
        `Pair address has not been found`,
        createError(404, "your conditions does not match any data")
      );
    }
    return status(true, `Pair metrics successfully found`, metrics);
  } catch (err) {
    console.log(err);
    return status(
      false,
      "There was an error finding the pair metrics: ERROR - " + err.message,
      createError(503, "There was an error finding the pair metrics")
    );
  }
}

module.exports = getMetricsByDateRange;
