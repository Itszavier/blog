/** @format */
import UserModel from "../model/user";
import { Router } from "express";
import bycrpt from "bcrypt";
import { generateFromEmail } from "unique-username-generator";
import jwt from "jsonwebtoken";
import verifyAuth from "../middleware/checkauth";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/", (req, res, next) => {
  res.send("welcome to the auth api");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required fields." });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email address already in use." });
    }

    const username = generateFromEmail(email, 2);
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const createdUser = new UserModel({
      name: username,
      email,
      password: hashedPassword,
    });

    await createdUser.save();

    res.status(200).json({
      message: `Welcome ${username}`,
      user: { name: createdUser.name, email: createdUser.email },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during registration." });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required fields." });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email not registered" });
    }

    if (!bycrpt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET as string);

    res.setHeader("Authorization", token);

    res
      .json({
        message: `Welcome back ${user.email}`,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      })
      .status(200);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during registration." });
  }
});

router.post("/check", verifyAuth);

export default router;
