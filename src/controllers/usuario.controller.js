import {
  loginService,
  registroService,
  socialLoginService,
} from "../services/auth.service.js";
import {
  actualizarUsuarioService,
  cambiarRolUsuarioService,
  eliminarUsuarioService,
  eliminarUsuarioPermanentService,
  restaurarUsuarioService,
  obtenerUsuariosService,
  obtenerUsuarioIdService,
} from "../services/usuario.service.js";
export const loginController = async (req, res, next) => {
  try {
    const resultado = await loginService(req.body.correo, req.body.contrasenia);
    res.json(resultado);
  } catch (error) {
    console.error("Error en login:", error.message);

    if (error.message === "Credenciales inválidas") {
      return res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
    }

    if (error.message === "Email y contraseña son requeridos") {
      return res.status(400).json({
        message: "Email y contraseña son requeridos",
      });
    }

    next(error);
  }
};

export const socialLoginController = async (req, res, next) => {
  try {
    const { token } = req.body;
    const resultado = await socialLoginService(token);
    res.json(resultado);
  } catch (error) {
    console.error("Error en social login:", error.message);
    res.status(401).json({ message: error.message });
  }
};

export const registroController = async (req, res, next) => {
  try {
    const resultado = await registroService(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("[Registro Controller] Error:", error);
    if (error.code === 11000 || error.message === "El usuario ya existe") {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    next(error);
  }
};
export const obtenerUsuariosController = async (req, res, next) => {
  try {
    const { includeDeleted } = req.query;
    const usuarios = await obtenerUsuariosService({
      includeDeleted: includeDeleted === "true",
    });
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
    if (
      req.usuario.rol !== "admin" &&
      req.usuario.usuarioId !== req.params.id
    ) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para editar este perfil" });
    }

    const usuarioActualizado = await actualizarUsuarioService(
      req.params.id,
      req.body
    );
    res.json(usuarioActualizado);
  } catch (error) {
    if (
      error.code === 11000 ||
      error.message === "El correo ya está en uso por otro usuario"
    ) {
      return res
        .status(400)
        .json({ message: "El correo ya está en uso por otro usuario" });
    }
    next(error);
  }
};

export const eliminarUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBy = req.usuario?.usuarioId || null;
    const usuarioEliminado = await eliminarUsuarioService(id, deletedBy);

    res.status(200).json({
      message: "Usuario eliminado correctamente (soft-delete)",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error al eliminar usuario:", error);
    console.error("Stack trace:", error.stack);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const eliminarUsuarioPermanenteController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await eliminarUsuarioPermanentService(id);
    res.status(200).json({
      message: "Usuario eliminado permanentemente",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).json({ message: error.message });
    }

    console.error("Error al eliminar usuario permanentemente:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const restaurarUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioRestaurado = await restaurarUsuarioService(id);
    if (!usuarioRestaurado)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({
      message: "Usuario restaurado correctamente",
      usuario: usuarioRestaurado,
    });
  } catch (error) {
    console.error("Error al restaurar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const cambiarRolUsuarioController = async (req, res, next) => {
  try {
    const { id } = req.params; // viene del endpoint /usuarios/:id
    const { rol } = req.body; // viene del body de Postman

    const usuarioActualizado = await cambiarRolUsuarioService(id, rol);
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
