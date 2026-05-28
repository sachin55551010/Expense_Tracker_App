import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";
  if (error.code === "P2025") {
    error.message = "User not found";
  }
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};
