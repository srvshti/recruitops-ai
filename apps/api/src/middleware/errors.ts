import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export const notFound = () => {
  throw new ApiError(404, "Resource not found");
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Request validation failed",
      issues: error.issues,
      path: req.path
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: "API_ERROR",
      message: error.message,
      path: req.path
    });
  }

  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Unexpected server error",
    path: req.path
  });
};
