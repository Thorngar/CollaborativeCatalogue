import { Client } from '@elastic/elasticsearch'
import { config } from 'dotenv';
import { readFileSync } from 'fs';
config({ path: 'variables.env' });
export class ElasticService {
  public static _client?: Client;
  public static get client () {
    return this._client;
  };
  public static async init(){
    try {
      const client = new Client({
      node:process.env.ELASTIC_NODE,
      auth: {
        apiKey: `${process.env.ELASTIC_API_KEY}`
      },
      tls: {
        ca: readFileSync(`${process.env.ELASTIC_CA}`),
      },
      requestTimeout: 500,
    });
      await client.ping();
      console.log('Client elastic connect');
      const health = await client.cluster.health();
      console.log(health);
      return (this._client = client);
      } catch (e) {
        console.error(`${e}`);
      };
    };
};