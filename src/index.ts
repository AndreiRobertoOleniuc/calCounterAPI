import express, { Express, Request, Response } from "express";

import authRouter from "./routes/auth";
import mongoose from "mongoose";
import { configurePassport } from "./config/passport";

//Setup DotEnv
require("dotenv").config();
configurePassport();

const app: Express = express();

const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(express.json());

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

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
