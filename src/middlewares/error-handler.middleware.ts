import { type NextFunction, type Request, type Response } from "express";
import { env } from "../config/env";
import { AppError } from "../utils/app-error";

export const errorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: env.NODE_ENV === "development" ? error.message : undefined,
  });
};
