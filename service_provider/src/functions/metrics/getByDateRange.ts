const controllers = require("../../controllers");
import { IStatus } from "../../utilities/status";

interface IByDateRange {
  pairAdress: string;
  fromDate: Date;
  toDate: Date;
}

// As a very simple functionality just return the required data

const getByDateRange = async ({
  pairAdress,
  fromDate,
  toDate,
}: IByDateRange): Promise<IStatus> => {
  const response = await controllers.metrics.getByDateRange(
    pairAdress,
    fromDate,
    toDate
  );
  return response;
};

export = getByDateRange;
