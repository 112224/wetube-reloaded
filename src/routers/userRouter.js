import express from "express"
import {edit} from "../Controllers/videoController"
import { deleteUser } from "../Controllers/userController";


const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);


export default userRouter;