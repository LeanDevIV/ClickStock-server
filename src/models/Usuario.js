import mongoose from "mongoose";
import argon2 from "argon2";
const UsuarioEsquema = new mongoose.Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    emailUsuario: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Ingrese un email válido",
      ],
    },
    rolUsuario: {
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
