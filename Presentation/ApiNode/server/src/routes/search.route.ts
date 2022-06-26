import { Router } from "express";
import { SearchController } from "../controllers/search.controller.js";

const apiRouter: Router = Router();

apiRouter.post('/search', SearchController.search);


export { apiRouter };