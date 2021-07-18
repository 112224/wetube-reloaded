import express from "express";
import {
  logout,
  see,
  getEdit,
  startGithubLogin,
  finishGithubLogin,
  postEdit,
} from "../Controllers/userController";
import { protecteMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protecteMiddleware, logout);
userRouter.route("/edit").all(protecteMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;
