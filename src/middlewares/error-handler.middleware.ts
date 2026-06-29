import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

export const errorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: env.NODE_ENV === "development" ? error.message : undefined,
  });
};
