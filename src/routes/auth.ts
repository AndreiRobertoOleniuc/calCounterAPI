import { Router } from "express";
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
      let jwtToken;
      if (user.email === "bot@apiax.com") {
        jwtToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "");
      } else {
        jwtToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "", {
          expiresIn: "12h",
        });
      }
      res
        .status(301)
        .redirect(`${process.env.FRONTEND_URL}/callback?token=${jwtToken}`);
    } catch (error) {
      res.status(500).send("Failed to create Authenticate");
    }
  }
);

export default authRouter;