import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import { ERROR } from "../utils/HttpStatusText";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secretKey = process.env.jWT_SECRET_KEY || "";
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Token is required", 401, ERROR));
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("Token is malformed", 401, ERROR));
  }
  const decoded = jwt.verify(token, secretKey);

  req.user = decoded;
  next();
}
