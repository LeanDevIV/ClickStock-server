import admin from "../config/firebase.js";
import { UsuarioModel as Usuario } from "../models/Usuario.js";
import jwt from "jsonwebtoken";

export const socialLoginController = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token de autenticación requerido" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    let usuario = await Usuario.findOne({ correo: email });

    if (usuario) {
      if (usuario.isDeleted) {
        usuario.isDeleted = false;
        usuario.deletedAt = null;
        usuario.deletedBy = null;
      }

      if (!usuario.fotoPerfil) {
        usuario.fotoPerfil = picture;
      }

      await usuario.save();
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const nombreParts = name ? name.split(" ") : ["Usuario", "Social"];
      const nombre = nombreParts[0];
      const apellido = nombreParts.slice(1).join(" ") || "Social";

      usuario = new Usuario({
        nombre,
        apellido,
        correo: email,
        contrasenia: randomPassword,
        fotoPerfil: picture,
        rol: "usuario",
        googleId: uid,
      });

      await usuario.save();
    }

    const appToken = jwt.sign(
      {
        usuarioId: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login social exitoso",
      token: appToken,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        fotoPerfil: usuario.fotoPerfil,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en Social Login:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
