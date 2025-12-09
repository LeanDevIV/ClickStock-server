import mongoose from "mongoose";
import argon2 from "argon2";
const UsuarioEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [30, "El nombre no puede exceder los 30 caracteres"],
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ],
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
      maxlength: [30, "El apellido no puede exceder los 30 caracteres"],
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El apellido solo puede contener letras y espacios",
      ],
    },
    correo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Ingrese un email válido",
      ],
    },

    telefono: {
      type: String,
      trim: true,
      maxlength: [20, "El teléfono no puede exceder los 20 caracteres"],
      match: [
        /^[0-9+\-\s()]*$/,
        "El teléfono solo puede contener números y símbolos válidos",
      ],
    },

    fotoPerfil: {
      type: String,
      default: null,
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },
    contrasenia: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true }
);
UsuarioEsquema.pre("save", async function (next) {
  const usuario = this;
  if (!usuario.isModified("contrasenia")) {
    return next();
  }
  try {
    usuario.contrasenia = await argon2.hash(usuario.contrasenia);
    next();
  } catch (error) {
    next(error);
  }
});
export const UsuarioModel = mongoose.model("usuarios", UsuarioEsquema);
