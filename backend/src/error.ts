import { NextFunction, Request, Response } from 'express';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    message: 'Internal server error',
  });
};

export { AppError, handleErrors };
