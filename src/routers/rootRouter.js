import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../Controllers/userController";
import { homepageVideos, searchVideo } from "../Controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", homepageVideos);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", searchVideo);

export default rootRouter;
