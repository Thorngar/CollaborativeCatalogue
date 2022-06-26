import { Request, Response } from "express";
import fetch from "node-fetch";
import { ElasticService } from "../services/elastic.service.js";

class SearchController {
  public static async search(req: Request, res: Response) {

    const q = req.query.q;
    console.log(q);

    if (!q) {
      res.status(400);
      res.json({
        message: 'Please enter a query'
      });
      return;
    };
    console.log('SearchController');
    const search = await ElasticService.client?.search({
      index: 'tools_mapping',
      query: {
        multi_match: {
          query: `${q}`, // that's is a q .... q for query 
          "fuzziness": 2
        }
      }
    });
    res.json(search?.hits.hits)
    console.log(search?.hits.hits);
  }
};

export { SearchController };