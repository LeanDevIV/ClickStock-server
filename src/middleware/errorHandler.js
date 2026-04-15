export const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || err.status || err.response?.status || 500;

  let message =
    err.response?.data?.error?.message ||
    err.response?.data?.message ||
    err.message ||
    "Internal Server Error";

  if (err.response?.status === 429) {
    message =
      "Se ha superado el límite de consultas al asistente. Intenta de nuevo más tarde.";
  }

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    message = `Recurso no encontrado con id: ${err.value}`;
  }

  if (err.name === "JsonWebTokenError") {
    message = "Token inválido o expirado";
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
};
