import mongoose from "mongoose";
const UsuarioEsquema = new Schema(
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
export const UsuarioModel = model("usuarios",UsuarioEsquema);
