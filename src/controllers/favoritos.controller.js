import {
  obtenerFavoritosUsuarioService,
  agregarProductoFavoritosService,
  eliminarProductoFavoritosService,
  verificarProductoEnFavoritosService,
  limpiarFavoritosService,
} from "../services/favoritos.service.js";

/**
 * Obtiene los favoritos del usuario autenticado
 */
export const obtenerFavoritosController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const favoritos = await obtenerFavoritosUsuarioService(idUsuario);
    res.json(favoritos);
  } catch (error) {
    next(error);
  }
};

/**
 * Agrega un producto a los favoritos del usuario
 */
export const agregarProductoFavoritosController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const { idProducto } = req.body;

    if (!idProducto) {
      return res.status(400).json({
        mensaje: "Debe proporcionar un idProducto",
      });
    }

    const favoritosActualizados = await agregarProductoFavoritosService(
      idUsuario,
      idProducto
    );
    res.json({
      mensaje: "Producto agregado a favoritos exitosamente",
      favoritos: favoritosActualizados,
    });
  } catch (error) {
    if (error.message.includes("ya está en tus favoritos")) {
      return res.status(409).json({
        mensaje: error.message,
      });
    }
    next(error);
  }
};

/**
 * Elimina un producto de los favoritos
 */
export const eliminarProductoFavoritosController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const { idProducto } = req.params;

    const favoritosActualizados = await eliminarProductoFavoritosService(
      idUsuario,
      idProducto
    );
    res.json({
      mensaje: "Producto eliminado de favoritos exitosamente",
      favoritos: favoritosActualizados,
    });
  } catch (error) {
    if (error.message.includes("no está en tus favoritos")) {
      return res.status(404).json({
        mensaje: error.message,
      });
    }
    next(error);
  }
};

/**
 * Verifica si un producto está en los favoritos del usuario
 */
export const verificarProductoEnFavoritosController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const { idProducto } = req.params;

    const estaEnFavoritos = await verificarProductoEnFavoritosService(
      idUsuario,
      idProducto
    );
    res.json({
      idProducto,
      estaEnFavoritos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Limpia todos los favoritos del usuario
 */
export const limpiarFavoritosController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const favoritosVacios = await limpiarFavoritosService(idUsuario);
    res.json({
      mensaje: "Favoritos limpiados exitosamente",
      favoritos: favoritosVacios,
    });
  } catch (error) {
    next(error);
  }
};

