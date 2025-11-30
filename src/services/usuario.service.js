import { UsuarioModel } from "../models/Usuario.js";
import admin from "../config/firebase.js";

export const obtenerUsuariosService = async (filters = {}) => {
  const query = {};
  if (!filters.includeDeleted) {
    query.isDeleted = false;
  }
  const usuario = await UsuarioModel.find(query).populate(
    "deletedBy",
    "nombre apellido correo"
  );
  return usuario;
};
export const obtenerUsuarioIdService = async (id) => {
  const usuario = await UsuarioModel.findOne({ _id: id, isDeleted: false });
  return usuario;
};

export const obtenerUsuarioPorCorreo = async (correo) => {
  const usuario = await UsuarioModel.findOne({ correo });
  return usuario;
};

export const actualizarUsuarioService = async (id, data) => {
  if (data.correo) {
    const correoLimpio = data.correo.trim();
    const usuarioExistente = await UsuarioModel.findOne({
      correo: correoLimpio,
      _id: { $ne: id },
    });

    if (usuarioExistente) {
      throw new Error("El correo ya está en uso por otro usuario");
    }
    data.correo = correoLimpio;
  }

  const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return usuarioActualizado;
};
export const eliminarUsuarioService = async (id, deletedBy = null) => {
  const usuario = await UsuarioModel.findById(id);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  usuario.isDeleted = true;
  usuario.deletedAt = new Date();
  if (deletedBy) usuario.deletedBy = deletedBy;

  await usuario.save();
  return usuario;
};

export const eliminarUsuarioPermanentService = async (id) => {
  const usuario = await UsuarioModel.findById(id);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  if (usuario.googleId) {
    try {
      await admin.auth().deleteUser(usuario.googleId);
    } catch (error) {
      console.error(
        `[Firebase] Error al eliminar usuario ${usuario.googleId}:`,
        error
      );
    }
  }

  const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
  return usuarioEliminado;
};

export const restaurarUsuarioService = async (id) => {
  const usuario = await UsuarioModel.findById(id);
  if (!usuario) return null;
  usuario.isDeleted = false;
  usuario.deletedBy = null;
  usuario.deletedAt = null;
  await usuario.save();
  return usuario;
};

export const cambiarRolUsuarioService = async (id, rol) => {
  if (!["usuario", "admin"].includes(rol)) {
    throw new Error("Rol inválido");
  }

  const usuarioActualizado = await actualizarUsuarioService(id, { rol });

  if (!usuarioActualizado) {
    throw new Error("Usuario no encontrado");
  }

  return usuarioActualizado;
};
export const crearUsuarioService = async (datosUsuario) => {
  const nuevoUsuario = new UsuarioModel(datosUsuario);
  return await nuevoUsuario.save();
};
