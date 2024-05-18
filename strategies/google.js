import passport from "passport";
import User from "../models/user.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

import { Strategy as GoogleStrategy } from "passport-google-oauth2";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOrCreate({ email: profile.email });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// визначаємо, що зберігати в сесії.
passport.serializeUser((user, done) => {
  done(null, user.doc._id);
});

// визначаємо, що зберігати в req.user
passport.deserializeUser((user, done) => {
  done(null, user);
});
