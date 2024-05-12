/** @format */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorMessage } from "./error";

dotenv.config();

const verify = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(next(errorMessage(401, "Unauthorized access please login")));
  }

  next();
};

export default verify;
