/** @format */
import UserModel from "../model/user";
import { Router } from "express";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyAuth from "../middleware/checkauth";
import dotenv from "dotenv";

import passport from "passport";

dotenv.config();

const router = Router();

router.get("/login/google", passport.authenticate("google"));

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/profile",
  })
);

router.get("/check", verifyAuth, (req, res, next) => {
  res.status(201).json({
    message: `Hi, ${req.user?.name}`,
    user: {
      _id: req.user?.avater,
      name: req.user?.name,
      email: req.user?.email,
      avatar: req.user?.avater,
    },
  });
});
export default router;
