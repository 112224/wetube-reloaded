import express from "express";
import { deleteUser, logout, see, edit, startGithubLogin, finishGithubLogin } from "../Controllers/userController";


const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);


export default userRouter;
