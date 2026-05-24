import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "./CustomErrorHandler.js";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}
export const checkAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new CustomErrorHandler(401, "Unauthorized"));
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
    id: string;
    email: string;
    name: string;
  };

  req.user = decoded;
  next();
};
