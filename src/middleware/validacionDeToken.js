import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/Usuario.js";

export const ValidacionDeToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos para tener los datos frescos (rol actualizado)
    const usuario = await UsuarioModel.findById(decoded.usuarioId);

    if (!usuario || usuario.isDeleted) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o inactivo" });
    }

    // Adjuntar el usuario fresco a la request
    // Mantenemos la estructura que esperan los controladores
    req.usuario = {
      usuarioId: usuario._id.toString(),
      correo: usuario.correo,
      rol: usuario.rol,
      ...decoded, // Mantener otras propiedades del token si las hubiera
    };

    next();
  } catch (error) {
    console.error("Error en validación de token:", error.message);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
