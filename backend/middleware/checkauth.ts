import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(400).json({
      message: "unauthorized login session was not found pleace login",
    });
  }
  try {
    const decodedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    );

    res.json({ decodedToken });
  } catch (error) {
    console.log("verify function error", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

export default verifyAuth;
