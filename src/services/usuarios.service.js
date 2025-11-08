import { UsuarioModel } from "../models/Usuario.js";


export const obtenerUsuariosService = async () => {
  const usuario = await UsuarioModel.find();
  return usuario;
};
export const obtenerUsuarioIdService = async (id) => {
  const usuario = await UsuarioModel.findById(id);
  return usuario;
};

export const actualizarUsuarioService = async (id, data) => {
  const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return usuarioActualizado;
};
export const eliminarUsuarioService = async (id) => {
  const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);

  if (!usuarioEliminado) {
    throw new Error("Usuario no encontrado");
  }

  return usuarioEliminado;
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
