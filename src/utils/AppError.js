class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    // Define si es error del cliente (4xx) o del servidor (5xx)
    this.isOperational = statusCode >= 400 && statusCode < 500;

    // Mantiene el stack trace limpio
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
