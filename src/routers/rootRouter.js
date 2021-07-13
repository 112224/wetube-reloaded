import express from "express";
import { getJoin,postJoin, getLogin, postLogin } from "../Controllers/userController";
import { homepageVideos, searchVideo } from "../Controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", homepageVideos);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", searchVideo)

export default rootRouter;
