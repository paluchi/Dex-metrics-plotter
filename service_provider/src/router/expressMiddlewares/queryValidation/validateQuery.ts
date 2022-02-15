import Joi from "Joi"; // Module used for request query parameters verification
import CreateError from "http-errors";
import commands from "./commands";
import { status, IStatus } from "../../../utilities/status";

//schemas for diferent request entries
const getMetricsSchema: Joi.ObjectSchema = Joi.object({
  pairAdress: Joi.string().required(),
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
});

const validateQuery = (command: string, query: object): IStatus => {
  // Call Joi validation function
  let validation: any = {};
  switch (command) {
    case commands.GET_METRICS_BY_DATE_RANGE:
      validation = getMetricsSchema.validate(query);
      break;
  }

  // If error field exists then an error courred
  if (validation.error) {
    const errorMessage = validation.error.details[0].message;
    return status(false, "", CreateError(400, errorMessage));
  }

  // If there is not error then return data
  return status(true, "", validation.value);
};

export = validateQuery;
