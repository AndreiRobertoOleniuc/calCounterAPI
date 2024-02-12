import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import User from "../models/user";

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  if (!user) {
    done(null, 1);
  } else {
    done(null, user.id);
  }
});

const clientID = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const backendUrl = process.env.BACKEND_URL || "";

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: `${backendUrl}/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const currentUser = await User.findOne({ google_id: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await new User({
            google_id: profile.id,
            first_name: profile?.name?.givenName,
            last_name: profile?.name?.familyName,
            email: profile._json.email,
            photo: profile._json.picture,
          }).save();
          done(null, newUser);
        }
    } catch (error) {
        done(error as Error, undefined);
    }
    }
  )
);

export default passport;
