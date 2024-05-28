/** @format */
import UserModel from "../model/user";
import { Router } from "express";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyAuth from "../middleware/checkauth";
import dotenv from "dotenv";

import passport from "passport";
import ensureAuthenticated from "../middleware/checkauth";

dotenv.config();

const router = Router();

router.get("/login/google", passport.authenticate("google"));

router.get("/google/redirect", passport.authenticate("google"), (req, res, next) => {
  res.redirect(`http://localhost:5173/profile/${req.user?._id}`);
});

router.get("logout", ensureAuthenticated, async (req, res, next) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.status(200).send({ message: "Logged out successfully" });
  });
});

router.get("/check", ensureAuthenticated, (req, res, next) => {
  res.status(201).json({
    message: `Hi, ${req.user?.name}`,
    user: {
      _id: req.user?._id,
      name: req.user?.name,
      username: req.user?.username,
      email: req.user?.email,
      profileImage: req.user?.profileImage,
      bio: req.user?.bio,
      bannerUrl: req.user?.bannerUrl,
    },
  });
});
export default router;
