/** @format */

import { Request, Response, NextFunction } from "express";
import { z } from "zod";

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
  if (error instanceof z.ZodError) {
    // Zod validation error occurred
    const errorMessages = error.errors.map((err) => err.message);
    return res.status(400).json({
      message: "Validation failed",
      errors: errorMessages,
    });
  }

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
