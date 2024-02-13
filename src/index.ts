import express, { Express, Request, Response } from "express";

import authRouter from "./routes/auth";
import mongoose from "mongoose";
import { configurePassport } from "./config/passport";
import session from "express-session";
import passport from "passport";
import authMiddleware from "./middleware/auth";

//Setup DotEnv
require("dotenv").config();
configurePassport();

const app: Express = express();

const port = 4000;

app.use(express.json());
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET || "", // replace with your own secret
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Connect to MongoDb
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.info(`connected to mongo db 🚀`))
  .catch((err) => console.error({ err: err }, "failed to connect to db 🪳"));

app.use((_req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "http://localhost:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//Routes
app.use("/auth", authRouter);
app.get("/", authMiddleware, (req: Request, res: Response) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
