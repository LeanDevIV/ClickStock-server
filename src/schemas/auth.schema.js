import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    nombre: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    apellido: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede exceder los 50 caracteres"),
    correo: z
      .string()
      .email("Debe ser un correo electrónico válido")
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Debe ser un correo electrónico válido"
      ),
    contrasenia: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    telefono: z
      .string()
      .min(10, "El teléfono debe tener al menos 10 caracteres")
      .optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    correo: z.string().email("Debe ser un correo electrónico válido"),
    contrasenia: z.string().min(1, "La contraseña es requerida"),
  }),
});

export const socialLoginSchema = z.object({
  body: z.object({
    token: z.string().min(1, "El token es requerido"),
  }),
});
