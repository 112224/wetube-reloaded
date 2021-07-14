import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session from "express-session";
import { localMiddleware } from "./middlewares";
const app = express();

const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    })
);

app.use(localMiddleware)
app.get("/checkInfo",(req,res,next) =>{
    req.session.potato += 1;
    return res.send(`${req.session.id}+\n+${req.session.potato}`);
});
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
