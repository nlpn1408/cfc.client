import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

// Error types mapping
const ERROR_TYPES = {
  ValidationError: 400,
  AuthenticationError: 401,
  AuthorizationError: 403,
  NotFoundError: 404,
  ConflictError: 409,
  PrismaError: {
    P2002: 409, // Unique constraint violation
    P2025: 404, // Record not found
    P2003: 400, // Foreign key constraint violation
  }
};

export const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get the error stack
  const errorStack = err.stack || '';

  // Log error details
  console.error(`
    [Error] ${new Date().toISOString()}
    Type: ${err.name}
    Message: ${err.message}
    Path: ${req.path}
    Method: ${req.method}
    Stack: ${errorStack}
  `);

  // Determine status code
  let statusCode = err.statusCode || 500;
  
  // Handle Prisma errors
  if (err.code && err.code.startsWith('P')) {
    statusCode = ERROR_TYPES.PrismaError[err.code as keyof typeof ERROR_TYPES.PrismaError] || 500;
  }
  // Handle known error types
  else if (err.name in ERROR_TYPES) {
    const errorType = ERROR_TYPES[err.name as keyof typeof ERROR_TYPES];
    statusCode = typeof errorType === 'number' ? errorType : 500;
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
    error: {
      type: err.name,
      code: err.code,
      ...(process.env.NODE_ENV === 'development' && { stack: errorStack })
    }
  });
};
