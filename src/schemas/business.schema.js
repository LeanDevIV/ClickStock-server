import { z } from "zod";
import mongoose from "mongoose";

// Helper para validar ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "ID inválido",
  });

// --- PRODUCTOS ---
const productoBody = z.object({
  nombre: z
    .string({ invalid_type_error: "El nombre debe ser un texto" })
    .min(1, "El nombre es requerido")
    .max(45, "El nombre no puede exceder los 45 caracteres")
    .trim(),
  descripcion: z
    .string({ invalid_type_error: "La descripción debe ser un texto" })
    .max(300, "La descripción no puede exceder los 300 caracteres")
    .trim()
    .optional()
    .default(""),
  precio: z.coerce
    .number({ invalid_type_error: "El precio debe ser un número" })
    .min(0, "El precio no puede ser negativo")
    .max(5000000, "El precio no puede exceder los 5.000.000"),
  categoria: z.preprocess(
    (val) => (val === "" ? null : val),
    objectIdSchema.optional().nullable()
  ),
  stock: z.coerce
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int()
    .min(0, "El stock no puede ser negativo")
    .max(2500, "El stock no puede exceder los 2500")
    .default(0),
  imagenes: z.array(z.string().url("URL de imagen inválida")).optional(),
  disponible: z.boolean().optional().default(true),
});

export const productoSchema = z.object({
  body: productoBody,
});

export const productoUpdateSchema = z.object({
  body: productoBody.partial(),
});

// --- PROMOCIONES ---
const promocionBaseSchema = z.object({
  titulo: z.string().min(1, "El título es requerido").trim(),
  descripcion: z.string().min(1, "La descripción es requerida").trim(),
  descuento: z.coerce
    .number({ invalid_type_error: "El descuento debe ser un número" })
    .min(1, "El descuento mínimo es 1%")
    .max(100, "El descuento máximo es 100%"),
  productos: z.array(objectIdSchema).optional(),
  fechaInicio: z.coerce.date({
    required_error: "La fecha de inicio es requerida",
    invalid_type_error: "Fecha de inicio inválida",
  }),
  fechaFin: z.coerce.date({
    required_error: "La fecha de fin es requerida",
    invalid_type_error: "Fecha de fin inválida",
  }),
  activa: z.boolean().optional().default(true),
});

const promocionBody = promocionBaseSchema.refine(
  (data) => data.fechaFin > data.fechaInicio,
  {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["fechaFin"],
  }
);

export const promocionSchema = z.object({
  body: promocionBody,
});

export const promocionUpdateSchema = z.object({
  body: promocionBaseSchema.partial(),
});

// --- REVIEWS ---
const onlyValidCharsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,!?\s-]+$/;
const noEmojiRegex = /^[^\p{Emoji}]+$/u;
const noRepetitionsRegex = /(.)\1{3,}/;

export const reviewSchema = z.object({
  body: z.object({
    productId: objectIdSchema,
    user: z
      .string({ invalid_type_error: "El nombre debe ser un texto" })
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(25, "El nombre no puede exceder los 25 caracteres")
      .trim()
      .regex(onlyValidCharsRegex, "Caracteres inválidos en el nombre")
      .regex(noEmojiRegex, "No se permiten emojis en el nombre")
      .refine((val) => !noRepetitionsRegex.test(val), {
        message: "No repitas caracteres más de 3 veces en el nombre",
      }),
    rating: z.coerce
      .number({ invalid_type_error: "La calificación debe ser un número" })
      .min(1, "La calificación mínima es 1")
      .max(5, "La calificación máxima es 5"),
    comment: z
      .string({ invalid_type_error: "El comentario debe ser un texto" })
      .min(10, "El comentario debe tener al menos 10 caracteres")
      .max(300, "El comentario no puede exceder los 300 caracteres")
      .trim()
      .regex(onlyValidCharsRegex, "Caracteres inválidos en el comentario")
      .regex(noEmojiRegex, "No se permiten emojis en el comentario")
      .refine((val) => !noRepetitionsRegex.test(val), {
        message: "No repitas caracteres más de 3 veces en el comentario",
      }),
  }),
});
