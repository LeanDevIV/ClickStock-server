import jwt from "jsonwebtoken";
import argon2 from "argon2";
import {
  obtenerUsuariosService,
  crearUsuarioService,
} from "./usuarios.service.js";

export const loginService = async (correo, contrasenia) => {
  try {
    if (!correo || !contrasenia) {
      throw new Error("Email y contraseña son requeridos");
    }

    const usuarios = await obtenerUsuariosService();

    const usuario = usuarios.find((u) => u.correo === correo);

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
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const registroService = async (datosUsuario) => {
  const {
    nombre,
    apellido,
    correo,
    telefono,
    fotoPerfil,
    contrasenia,
    rol = "usuario",
  } = datosUsuario;

  // Validaciones mínimas
  if (!correo || !contrasenia || !nombre) {
    throw new Error("Correo, contraseña y nombre son requeridos");
  }

  // Crear usuario
  const usuarioCreado = await crearUsuarioService({
    nombre,
    apellido,
    correo,
    telefono,
    fotoPerfil,
    contrasenia,
    rol,
  });

  // Crear token
  const token = jwt.sign(
    {
      usuarioId: usuarioCreado._id,
      correo: usuarioCreado.correo,
      rol: usuarioCreado.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    message: "Usuario registrado exitosamente",
    usuario: {
      id: usuarioCreado._id,
      nombre: usuarioCreado.nombre,
      apellido: usuarioCreado.apellido,
      correo: usuarioCreado.correo,
      telefono: usuarioCreado.telefono,
      fotoPerfil: usuarioCreado.fotoPerfil,
      rol: usuarioCreado.rol,
      token,
    },
  };
};
