/** @format */

import { Request, Response, NextFunction } from "express";

export class ErrorResponse extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export function errorMessage(code: number, message: string) {
  return new ErrorResponse(code, message);
}

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.code) {
    return res
      .status(error.code)
      .json({ message: error.message, name: error.name, code: error.code });
  } else {
    return res
      .status(500)
      .json({ message: "Server internal error", code: 500, stack: error });
  }
}
