import express from "express";
import {join, login} from "../Controllers/userController";
import {homepageVideos, search} from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", homepageVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;