import express from "express";
import { getJoin,postJoin, login } from "../Controllers/userController";
import { homepageVideos, searchVideo } from "../Controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", homepageVideos);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", searchVideo)

export default rootRouter;
