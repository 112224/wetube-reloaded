import express from "express";

const app = express();
const PORT = 4000;

const logger = (req, res, next) => {
  console.log(`${req.method} : ${req.url}`);
  next();
};
const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
};
const handleHome = (req, res) => {
  return res.send("i love middlewares");
};
const handleLogin = (req, res) => {
  return res.send("Login here.");
};
const handleProtected = (req, res) => {
  return res.send("welcome to the private lounge");
};

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`Server listening on http://localhost:${PORT}!`);

app.listen(PORT, handleListening);
