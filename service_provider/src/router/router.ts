import { RequestHandler, Application } from "express";
import { IStatus } from "../utilities/status";
const functions = require("../functions");
const { queryValidator, authentication } = require("./expressMiddlewares");

// This function handle request query validation, business logic and status (very important)
const validateQuery = (command: string, callback: Function) => {
  const validate: RequestHandler = async (req, res, next) => {
    const query: object = req.query;
    const validation: IStatus = queryValidator.validate(command, query);
    if (!validation.status) next(validation.data);
    else {
      const response: IStatus = await callback(validation.data);
      if (!response.status) next(response.data);
      else res.json(response.data);
    }
  };

  return validate;
};

// Router REST declared entries
const router = (app: Application) => {
  // Get entries
  app
    .route("/metricsbydaterange")
    .get(
      authentication.apiKey,
      validateQuery(
        queryValidator.commands.GET_METRICS_BY_DATE_RANGE,
        functions.metrics.getByDateRange
      )
    );
};

export default router;
