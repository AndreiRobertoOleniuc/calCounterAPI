import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import User from "../types/user";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader;

    if (token == null) {
      return res.status(401).json({ message: "You are not signed in." });
    }

    const decodedToken: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    );
    UserModel.findOne({ _id: decodedToken._id })
      .then((user) => {
        if (user !== null) {
          req.user = (user as User) || null;
          next();
        } else {
          res.status(401).json({ message: "You are not signed in." });
        }
      })
      .catch(() => {
        res.status(401).json({ message: "You are not signed in." });
      });
  } catch (error) {
    res.status(401).json({
      message: "JWT Token invalid",
      error: error,
    });
  }
};

export default authMiddleware;
