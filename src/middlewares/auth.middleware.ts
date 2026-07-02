import { type NextFunction, type Request, type Response } from "express";
import { AppError } from "../utils/app-error";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }
  const token = authorization.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    (req as AuthenticatedRequest).userId = payload.userId;
    return next();
  } catch {
    return next(new AppError("Invalid or Expired token", 401));
  }
};
