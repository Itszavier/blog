/** @format */

import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";
import UserModel from "../model/user";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "https://narrate-server.loca.lt/auth/google/redirect",
      scope: ["profile", "email"],
    },

    async function (accessToken, RefresshToken, profile, done) {
      try {
        if (!profile.emails || profile.emails.length <= 0) {
          return done(new Error("Can not authenticate an account with no email"));
        }

        const userEmail = profile.emails[0].value;

        const user = await UserModel.findOne({
          email: userEmail,
        });

        if (!user) {
          const createdUser = new UserModel({
            name: profile.displayName,
            email: userEmail,
            avater: profile.profileUrl,
          });

          const savedUser = await createdUser.save();

          return done(null, savedUser);
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findOne({ _id: id });
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});

export default passport;
