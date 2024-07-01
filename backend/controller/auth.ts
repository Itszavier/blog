/** @format */
import { NextFunction, Request, Response } from "express";
import z from "zod";
import UserModel from "../model/user";
import { errorMessage } from "../middleware/error";

export default async function SignUp(req: Request, res: Response, next: NextFunction) {
  const bodySchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(2, { message: "Email must be at least 5 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  try {
    const { email, password } = bodySchema.parse(req.body);

    const user = await UserModel.findOne({ email });

    if (user) {
      return next(errorMessage(400, "User Already exist in our database"));
    }

    const createdUser = await UserModel.create({ email, password, authService: "local" });

    req.login(createdUser, function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("signup user and logIn");
      // Todo remove password field
      res.json({ message: "successfully created user", user: createdUser });
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
