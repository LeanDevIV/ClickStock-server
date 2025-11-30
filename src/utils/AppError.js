class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    this.isOperational = statusCode >= 400 && statusCode < 500;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
