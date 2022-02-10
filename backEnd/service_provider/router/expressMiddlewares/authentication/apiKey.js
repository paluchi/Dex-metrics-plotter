const createError = require("http-errors"); //error creator module

const serverApiKey = process.env.API_KEY;

function apiKey (req, res, next) {
  if (serverApiKey === req.headers.api_key) {
    next();
  } else {
    next(new createError(401, "You are not authorized to do this"));
  }
};

module.exports = apiKey
