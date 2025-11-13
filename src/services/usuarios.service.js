import { UsuarioModel } from "../models/Usuario.js";


export const obtenerUsuariosService = async () => {
  const usuario = await UsuarioModel.find({ isDeleted: false });
  return usuario;
};
export const obtenerUsuarioIdService = async (id) => {
  const usuario = await UsuarioModel.findOne({ _id: id, isDeleted: false });
  return usuario;
};

export const actualizarUsuarioService = async (id, data) => {
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
  const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
  if (!usuarioEliminado) {
    throw new Error("Usuario no encontrado");
  }
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

export const cambiarRolUsuarioService = async (id, rolUsuario) => {
  if (!["usuario", "admin"].includes(rolUsuario)) {
    throw new Error("Rol inválido");
  }

  const usuarioActualizado = await actualizarUsuarioService(id, { rolUsuario });

  if (!usuarioActualizado) {
    throw new Error("Usuario no encontrado");
  }

  return usuarioActualizado;
};
export const crearUsuarioService = async (datosUsuario) => {
  const nuevoUsuario = new UsuarioModel(datosUsuario);
  return await nuevoUsuario.save();
};
