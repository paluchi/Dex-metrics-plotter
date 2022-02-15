import express, { Application, Request, Response, NextFunction } from "express";

function requestConfig(app: Application): void {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //to prevent cors errors
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*"); //all web pages can access this api
    res.header("Access-Control-Allow-Headers", "*"); //headers that can be appended
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "*"); //methods that can be sent (get, post, delete, etc)
    }
    next();
  });
}

export = requestConfig;
