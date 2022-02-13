const createError = require("http-errors"); //error creator module
const mongoose = require("mongoose");
const pairModel = mongoose.model("pairs");

const { status } = require("../../utilities");

async function getMetrics(pairAdress, fromUnixTS, toUnixTS) {
  try {
    // const metrics = await pairModel.findOne({
    //   id: pairAdress,
    //   "snapshots.unix_timestamp": {
    //     $gte: fromUnixTS,
    //     $lte: toUnixTS,
    //   },
    // });
    const metrics = await pairModel.aggregate([
      { $match: { id: pairAdress } },
      // {
      //   $project: {
      //     snapshots: {
      //       $cond: [{
      //         $and: [
      //           { $gte: ["$snapshots.unix_timestamp", fromUnixTS] },
      //           { $lte: ["$snapshots.unix_timestamp", toUnixTS] },
      //         ],
      //       }],
      //     },
      //   },
      // },
    ]);
    //console.log("getMetrics ~ metrics", metrics);
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

module.exports = getMetrics;
