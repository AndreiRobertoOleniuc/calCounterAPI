import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user"; // Import your user model

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        // Here, you would find or create a user in your database
        const user = await User.create({ googleId: profile.id });
        done(null, user);
      }
    )
  );

  // Serialize and deserialize user instances to and from the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
};
