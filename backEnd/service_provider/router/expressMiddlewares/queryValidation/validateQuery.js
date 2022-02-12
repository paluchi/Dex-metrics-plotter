const joi = require("joi"); // Module used for request query parameters verification
const createError = require("http-errors");
const commands = require("./commands");

//schemas for diferent request entries
const getMetricsSchema = joi.object({
  pairAdress: joi.string().required(),
  fromUnixTS: joi.number().integer().required(),
  toUnixTS: joi.number().integer().required(),
});

const validateQuery = (command, query) => {
  // Call joi validation function
  let validation = {};
  switch (command) {
    case commands.GET_METRICS:
      validation = getMetricsSchema.validate(query);
      break;
  }

  // If error field exists then an error courred
  if (validation.error) {
    return {
      success: false,
      data: createError(400, validation.error.details[0].message),
    };
  }

  return {
    success: true,
    data: validation.value,
  };
};

module.exports = validateQuery;
