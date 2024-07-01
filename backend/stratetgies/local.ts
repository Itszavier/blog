/** @format */

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../model/user";
import { errorMessage } from "../middleware/error";
import { verifyPassword } from "../utils";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (email, password, cb) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user)
        return cb(
          errorMessage(
            401,
            "We don't have any users with that credentials please sign Up"
          ),
          false
        );

      const isMatch = await verifyPassword(password, user.password);

      if (!isMatch) {
        return cb(errorMessage(400, "Email or Password is incorrect"), false);
      }

      return cb(null, user);
    } catch (error) {
      console.log("login authenecation  error");
      cb(error, false);
    }
  })
);


export default passport;