import express from "express"
import {edit} from "../Controllers/videoController"
import { deleteUser, logout, see } from "../Controllers/userController";


const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get(":id", see);
userRouter.get("/logout", logout)


export default userRouter;