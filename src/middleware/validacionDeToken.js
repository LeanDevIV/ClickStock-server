import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/Usuario.js";

export const ValidacionDeToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await UsuarioModel.findById(decoded.usuarioId);

    if (!usuario || usuario.isDeleted) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o inactivo" });
    }

    req.usuario = {
      usuarioId: usuario._id.toString(),
      correo: usuario.correo,
      rol: usuario.rol,
      ...decoded,
    };

    next();
  } catch (error) {
    console.error("Error en validación de token:", error.message);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
