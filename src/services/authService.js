import jwt from "jsonwebtoken";
import argon2 from "argon2";
import {
  obtenerUsuariosService,
  crearUsuarioService,
} from "./usuariosServicio.js";

export const loginService = async (emailUsuario, contrasenia) => {
  try {
    if (!emailUsuario || !contrasenia) {
      throw new Error("Email y contraseña son requeridos");
    }

    const usuarios = await obtenerUsuariosService();

    const usuario = usuarios.find((u) => u.emailUsuario === emailUsuario);

    if (!usuario) {
      throw new Error("Credenciales inválidas");
    }

    const contraseniaValida = await argon2.verify(
      usuario.contrasenia,
      contrasenia
    );
    if (!contraseniaValida) {
      throw new Error("Credenciales inválidas");
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

    return {
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        emailUsuario: usuario.emailUsuario,
        rolUsuario: usuario.rolUsuario,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const registroService = async (datosUsuario) => {
  const {
    emailUsuario,
    contrasenia,
    nombreUsuario,
    rolUsuario = "usuario",
  } = datosUsuario;

  if (!emailUsuario || !contrasenia || !nombreUsuario) {
    throw new Error("Email, contraseña y nombre de usuario son requeridos");
  }

  const usuarioCreado = await crearUsuarioService({
    nombreUsuario,
    emailUsuario,
    contrasenia,
    rolUsuario,
  });
  const token = jwt.sign(
    {
      usuarioId: usuarioCreado._id,
      emailUsuario: usuarioCreado.emailUsuario,
      rolUsuario: usuarioCreado.rolUsuario,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    message: "Usuario registrado exitosamente",
    usuario: {
      id: usuarioCreado._id,
      nombreUsuario: usuarioCreado.nombreUsuario,
      emailUsuario: usuarioCreado.emailUsuario,
      rolUsuario: usuarioCreado.rolUsuario,
      token,
    },
  };
};
