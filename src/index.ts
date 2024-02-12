import express, { Express, Request, Response } from "express";

import authRouter from "./routes/auth";
const mongo = require("mongoose");

//Setup DotEnv
require("dotenv").config();

const app: Express = express();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(express.json());

//Connect to MongoDb
mongo.connect(process.env.MONGO_URI, () => {
  try {
    console.info(`connected to mongo db 🚀`);
  } catch (error) {
    console.error({ err: error }, "failed to connect to db 🪳");
  }
});

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
