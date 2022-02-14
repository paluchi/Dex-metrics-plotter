const createError = require("http-errors"); //error creator module
const mongoose = require("mongoose");
const pairModel = mongoose.model("pairs");

const { status } = require("../../utilities");

async function getMetricsByDateRange(pairAdress, fromDate, toDate) {
  try {
    // Request metrics
    const metrics = await pairModel.aggregate([
      { $match: { id: pairAdress } }, // Select pair with "pairAdress" id
      {
        $project: {
          id: "$id", // return "id" as "id"
          name: "$name",
          token0: "$token0",
          token1: "$token1",
          snapshots: {
            // return "snapshots" as a filtered version of snapwhots
            $filter: {
              input: "$snapshots",
              as: "ss",
              cond: {
                $and: [
                  { $gte: ["$$ss.date", fromDate] }, // Greater or equal than "fromDate"
                  { $lte: ["$$ss.date", toDate] }, // Less or equal than "toDate"
                ],
              },
            },
          },
        },
      },
    ]);

    // If no metrics retrieved return error status with error
    if (!metrics) {
      return status(
        false,
        `Pair address has not been found`,
        createError(404, "your conditions does not match any data")
      );
    }

    // If metrics retrieved returen success status with data
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
