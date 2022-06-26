import { config } from "dotenv";
import { createApi } from "./application.js";

config({ path: 'variables.env' });// JUST PORT FOR LOCALHOST EXPRESS

export const initAPI = async () => {
  const app = await createApi();

  try{
    app.listen(process.env.PORT, () => {
      console.log(`app runing on port : ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(`app not run error is : ${e}`);
  };
};
initAPI();