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
    successRedirect: "https://nht55j-5173.csb.app/profile",
  }),
);
export default router;
