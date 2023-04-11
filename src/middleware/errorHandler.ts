import { Request, Response, NextFunction } from "express";
import { AppError } from "../appError";

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: error.name,
      details: error.message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
    });
  }

  return res.status(500).send({
    success: false,
    message: error,
  });
};
