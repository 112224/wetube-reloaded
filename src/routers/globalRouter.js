import express from "express";
import { join, login } from "../Controllers/userController";
import { homepageVideos, searchVideo } from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", homepageVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", searchVideo)

export default globalRouter;
