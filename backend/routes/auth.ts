/** @format */
import UserModel from "../model/user";
import { Router } from "express";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyAuth from "../middleware/checkauth";
import dotenv from "dotenv";

import passport from "passport";
import ensureAuthenticated from "../middleware/checkauth";
import SignUp from "../controller/auth";

dotenv.config();

const router = Router();

router.post("/login", passport.authenticate("local"), function (req, res) {
  console.log("Successfully login with local Strategy", req.body, req.user);
  res.json({
    user: req.user,
  });
});

router.post("/signup", SignUp);

router.get("/login/google", passport.authenticate("google"), function (req, res) {
  res.redirect(`http://localhost:5173/profile/${req.user?.username}`);
});
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureMessage: "failed" }),
  (req, res, next) => {
    res.redirect(`https://narrate-client.loca.lt/profile/${req.user?.username}`);
  }
);

router.get("/logout", ensureAuthenticated, async (req, res, next) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.status(200).send({ message: "Logged out successfully" });
  });
});

router.get("/check", ensureAuthenticated, async (req, res, next) => {
  res.status(201).json({
    message: `Hi, ${req.user?.name}`,
    user: req.user,
  });
});
export default router;
