import CreateError from "http-errors"; //error creator module
import mongoose from "mongoose";
import { status, IStatus } from "../../utilities/status";

const pairModel = mongoose.model("pairs");

const getMetricsByDateRange = async (
  pairAdress: string,
  fromDate: Date,
  toDate: Date
): Promise<IStatus> => {
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
        `Pair adress has not been found`,
        CreateError(404, "your conditions does not match any data")
      );
    }

    // If metrics retrieved returen success status with data
    return status(true, `Pair metrics successfully found`, metrics);
  } catch (err) {
    console.log(err);
    return status(
      false,
      "",
      CreateError(503, "There was an error finding the pair metrics")
    );
  }
};

export = getMetricsByDateRange;
