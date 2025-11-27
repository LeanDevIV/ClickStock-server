import jwt from "jsonwebtoken";
import argon2 from "argon2";
import {
  obtenerUsuariosService,
  crearUsuarioService,
  obtenerUsuarioPorCorreo,
  actualizarUsuarioService,
} from "./usuario.service.js";

export const loginService = async (correo, contrasenia) => {
  try {
    if (!correo || !contrasenia) {
      throw new Error("Email y contraseña son requeridos");
    }

    const correoLimpio = correo.trim();

    const usuarios = await obtenerUsuariosService();

    const usuario = usuarios.find((u) => u.correo === correoLimpio);

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

  const correoLimpio = correo.trim();

  // Verificar si el usuario ya existe (incluyendo eliminados)
  let usuario = await obtenerUsuarioPorCorreo(correoLimpio);

  if (usuario) {
    if (!usuario.isDeleted) {
      throw new Error("El usuario ya existe");
    }

    // Si existe pero está eliminado, lo restauramos y actualizamos
    // Hashear nueva contraseña
    const hashedPassword = await argon2.hash(contrasenia);

    usuario = await actualizarUsuarioService(usuario._id, {
      nombre,
      apellido,
      telefono,
      fotoPerfil,
      contrasenia: hashedPassword, // Actualizamos la contraseña hasheada
      rol,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
    });
  } else {
    // Crear usuario nuevo
    usuario = await crearUsuarioService({
      nombre,
      apellido,
      correo: correoLimpio,
      telefono,
      fotoPerfil,
      contrasenia,
      rol,
    });
  }

  // Crear token
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
    message: "Usuario registrado exitosamente",
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fotoPerfil: usuario.fotoPerfil,
      rol: usuario.rol,
      token,
    },
  };
};
