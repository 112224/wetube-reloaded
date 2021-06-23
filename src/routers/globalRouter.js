import express from "express";
import {join} from "../Controllers/userController";
import {homepageVideos} from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", homepageVideos);
globalRouter.get("/join", join);

export default globalRouter;