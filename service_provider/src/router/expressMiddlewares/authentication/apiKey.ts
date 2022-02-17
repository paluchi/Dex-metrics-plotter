import { RequestHandler } from "express";
import CreateError from "http-errors"; //error creator module

const serverApiKey: string | undefined = process.env.API_KEY;

// Very simple api key auth
const apiKey: RequestHandler = (req, res, next) => {
  const clientApiKey: string | string[] | undefined = req.headers["api-key"];

  if (serverApiKey === clientApiKey) {
    next();
  } else {
    next(CreateError(401, "You are not authorized to do this"));
  }
};
export = apiKey;
