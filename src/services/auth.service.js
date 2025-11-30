import jwt from "jsonwebtoken";
import argon2 from "argon2";
import admin from "../config/firebase.js";
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

export const socialLoginService = async (token) => {
  try {
    if (!token) {
      throw new Error("Token de Firebase es requerido");
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    if (!email) {
      throw new Error("El token no contiene un email válido");
    }

    let usuario = await obtenerUsuarioPorCorreo(email);

    if (!usuario) {
      const nombreParts = name ? name.split(" ") : ["Usuario", "Social"];
      const nombre = nombreParts[0];
      const apellido = nombreParts.slice(1).join(" ") || "Social";

      const randomPassword = Math.random().toString(36).slice(-8) + "A1!";

      usuario = await crearUsuarioService({
        nombre,
        apellido,
        correo: email,
        contrasenia: randomPassword,
        fotoPerfil: picture,
        rol: "usuario",
        googleId: uid,
      });
    } else {
      if (!usuario.fotoPerfil && picture) {
        await actualizarUsuarioService(usuario._id, { fotoPerfil: picture });
        usuario.fotoPerfil = picture;
      }
    }

    const jwtToken = jwt.sign(
      {
        usuarioId: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      message: "Login social exitoso",
      token: jwtToken,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
        fotoPerfil: usuario.fotoPerfil,
      },
    };
  } catch (error) {
    console.error("Error en socialLoginService:", error);
    throw new Error("Error al procesar login social: " + error.message);
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

  if (!correo || !contrasenia || !nombre) {
    throw new Error("Correo, contraseña y nombre son requeridos");
  }

  const correoLimpio = correo.trim();

  let usuario = await obtenerUsuarioPorCorreo(correoLimpio);

  if (usuario) {
    if (!usuario.isDeleted) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await argon2.hash(contrasenia);

    usuario = await actualizarUsuarioService(usuario._id, {
      nombre,
      apellido,
      telefono,
      fotoPerfil,
      contrasenia: hashedPassword,
      rol,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
    });
  } else {
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
