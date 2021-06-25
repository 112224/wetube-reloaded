import express from "express";
import { deleteUser, logout, see } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.get("/delete", deleteUser);
userRouter.get(":id", see);
userRouter.get("/logout", logout);

export default userRouter;
