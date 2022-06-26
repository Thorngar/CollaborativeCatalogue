import cors from "cors";
import express, { Application, json } from "express";
// import { dbConnect } from "./database.js";
import { apiRouter } from "./routes/search.route.js";
import { ElasticService } from "./services/elastic.service.js";

async function createApi() {
  const app: Application = express();
  app.use(cors());
  app.use(json());
  // bd
  // await dbConnect()
  //elastic
  await ElasticService.init();
  // ENTER YOUR ROUTES HERE
  app.use(apiRouter);

  return app;
};

export { createApi };
