import jwt from "jsonwebtoken";
import argon2 from "argon2";
import {
  actualizarUsuarioService,
  cambiarRolUsuarioService,
  crearUsuarioService,
  eliminarUsuarioService,
  obtenerUsuarioIdService,
  obtenerUsuariosService,
} from "../services/usuariosServicio.js";
export const loginController = async (req, res, next) => {
  try {
    const { emailUsuario, contrasenia } = req.body;
    if (!emailUsuario || !contrasenia) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }
    const usuarios = await obtenerUsuariosService();
    const usuario = usuarios.find(
      (usuario) => usuario.emailUsuario === emailUsuario
    );

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const contraseniaValida = await argon2.verify(
      usuario.contrasenia,
      contrasenia
    );
    if (!contraseniaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      {
        usuarioId: usuario._id,
        emailUsuario: usuario.emailUsuario,
        rolUsuario: usuario.rolUsuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        emailUsuario: usuario.emailUsuario,
        rolUsuario: usuario.rolUsuario,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const registroController = async (req, res, next) => {
  try {
    const {
      emailUsuario,
      contrasenia,
      nombreUsuario,
      rolUsuario = "usuario",
    } = req.body;

    const token = jwt.sign({
      usuarioId: req.body._id,
      emailUsuario: req.body.emailUsuario,
      rolUsuario: req.body.rolUsuario,
    },process.env.JWT_SECRET,
    { expiresIn: "24h" });

    if (!emailUsuario || !contrasenia || !nombreUsuario) {
      return res
        .status(400)
        .json({ message: "Email, contraseña y nombreUsuario son requeridos" });
    }

    const datosUsuario = {
      nombreUsuario,
      emailUsuario,
      contrasenia,
      rolUsuario,
    };
    const usuarioCreado = await crearUsuarioService(datosUsuario);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: {
        id: usuarioCreado._id,
        nombreUsuario: usuarioCreado.nombreUsuario,
        emailUsuario: usuarioCreado.emailUsuario,
        rolUsuario: usuarioCreado.rolUsuario,
        token,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    next(error);
  }
};
export const obtenerUsuariosController = async (req, res, next) => {
  try {
    const usuarios = await obtenerUsuariosService();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuarioIdController = async (req, res, next) => {
  try {
    const usuario = await obtenerUsuarioIdService(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};
//-----------------------FUNCIONES PARA ADMINISTRADORES-----------------------//
export const actualizarUsuarioController = async (req, res, next) => {
  try {
    const usuarioActualizado = await actualizarUsuarioService(
      req.params.id,
      req.body
    );
    res.json(usuarioActualizado);
  } catch (error) {
    next(error);
  }
};

export const eliminarUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await eliminarUsuarioService(id);

    res.status(200).json({
      message: "Usuario eliminado correctamente",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const cambiarRolUsuarioController = async (req, res, next) => {
  try {
    const { id } = req.params; // viene del endpoint /usuarios/:id
    const { rolUsuario } = req.body; // viene del body de Postman

    const usuarioActualizado = await cambiarRolUsuarioService(id, rolUsuario);
    res.status(200).json({
      message: "Rol de usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    if (error.message === "Rol inválido") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error al cambiar el rol del usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
//-----------------------//-----------------------//-----------------------//-----------------------
