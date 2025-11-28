import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Demasiadas consultas desde esta direccion IP, por favor intente de nuevo en 15 minutos",
});
