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
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        // Here, you would find or create a user in your database
        console.log(profile);
        User.findOne({
          google_id: profile.id,
        }).then((currentUser) => {
          if (currentUser) {
            console.log("User is: ", currentUser);
            done(null, currentUser);
          } else {
            new User({
              google_id: profile.id,
              first_name: profile?.name?.givenName,
              last_name: profile?.name?.familyName,
              email: profile?._json.email,
              photo: profile?._json.picture,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
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
