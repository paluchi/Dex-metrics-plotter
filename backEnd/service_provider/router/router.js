const functions = require("../functions");
const { queryValidator, authentication } = require("./expressMiddlewares");

function validateQuery(command, callback) {
  const validate = async (req, res, next) => {
    const query = req.query;
    const validation = queryValidator.validate(command, query);
    if (!validation.success) next(validation.data);
    else {
      const response = await callback(validation.data);
      if (!response.status) next(response.data);
      else res.json(response.data);
    }
  };

  return validate;
}

// Router REST declared entries
function router(app) {
  // Get entries
  app
    .route("/metrics")
    .get(
      authentication.apiKey,
      validateQuery(queryValidator.commands.GET_METRICS, functions.metrics.get)
    );
}

module.exports = router;
