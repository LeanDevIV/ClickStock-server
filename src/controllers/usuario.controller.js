import { loginService, registroService } from "../services/auth.service.js";
import {
  actualizarUsuarioService,
  cambiarRolUsuarioService,
  crearUsuarioService,
  eliminarUsuarioService,
  obtenerUsuarioIdService,
  obtenerUsuariosService,
} from "../services/usuarios.service.js";
export const loginController = async (req, res, next) => {
  try {
    console.log("Datos recibidos:", {
      email: req.body.emailUsuario,
      hasPassword: !!req.body.contrasenia
    });

    const resultado = await loginService(
      req.body.emailUsuario,
      req.body.contrasenia
    );
    res.json(resultado);
  } catch (error) {
    console.error("Error en login:", error.message);
    
    if (error.message === "Credenciales inválidas") {
      return res.status(401).json({ 
        message: "Email o contraseña incorrectos"
      });
    }
    
    if (error.message === "Email y contraseña son requeridos") {
      return res.status(400).json({ 
        message: "Email y contraseña son requeridos"
      });
    }
    
    next(error);
  }
};
export const registroController = async (req, res, next) => {
  try {
    const resultado = await registroService(req.body);
    res.status(201).json(resultado);
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
