const authUser = require("./expressMiddlewares").autentication;
const functions = require("../functions");
const { queryValidation: QVal, authUser } = require("./expressMiddlewares");
const { generalErrorHander } = require("../utilities/generalErrorHander");

function validateQuery(command, callback) {
  const validate = (req, res, next) => {
    const query = req.query;
    const validation = QVal.validate(command, query);
    if (!validation.success) next(validation.data);
    else{
      const response = callback(...validation.data)
      if(!response.status) next(response.message)
      else res.json(response.data)
    };
  };

  return validate;
}

// Router REST declared entries
function router(app) {

  // Get entries 
  app.route("/metrics").get(
    authUser,
    validateQuery(Qval.commands.GET_METRICS, functions.metrics.get),
    generalErrorHander
  );
}

module.exports = router;
