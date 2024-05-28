/** @format */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorMessage } from "./error";

dotenv.config();

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  next(next(errorMessage(401, "You are Unauthorized, please login")));
};

export default ensureAuthenticated;
