//General Imports
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

//Configs
import { configurePassport } from "./config/passport";

//Middlewares
import authMiddleware from "./middleware/auth";

//Routes
import authRouter from "./routes/auth";
import settingsRouter from "./routes/settings";
import foodRouter from "./routes/food";

//Setup DotEnv
require("dotenv").config();
configurePassport();

const app: Express = express();

const port = process.env.BACKENDPORT;

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
  .connect(process.env.MONGO_DB_URI || "")
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
app.use("/settings", authMiddleware, settingsRouter);
app.use("/food", authMiddleware, foodRouter);
app.get("/", authMiddleware, (req: Request, res: Response) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
