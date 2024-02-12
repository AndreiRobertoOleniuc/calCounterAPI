import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

interface AuthRequest extends Request {
  user: any;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (token == null) {
      return res.status(401).json({ message: "You are not signed in." });
    }

    const decodedToken: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    );
    UserModel.findOne({ _id: decodedToken._id })
      .then((user) => {
        req.user = user || null;
        next();
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
