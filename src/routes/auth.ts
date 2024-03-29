import { Router, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req: any, res) => {
    try {
      const user = {
        _id: req.user._id,
        google_id: req.user.google_id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        roles: req.user.roles,
        photo: req.user.photo,
      };
      let jwtToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "");
      res.send({ jwtToken, user });
    } catch (error) {
      res.status(500).send("Failed to create Authenticate");
    }
  }
);

authRouter.get("/logout", (req: Request, res: Response) => {
  res.send(true);
});

export default authRouter;
