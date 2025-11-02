import {
  obtenerCarritoUsuarioService,
  agregarProductoCarritoService,
  actualizarCantidadProductoService,
  eliminarProductoCarritoService,
  limpiarCarritoService,
} from "../services/carrito.service.js";

/**
 * Obtiene el carrito del usuario autenticado
 */
export const obtenerCarritoController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const carrito = await obtenerCarritoUsuarioService(idUsuario);
    res.json(carrito);
  } catch (error) {
    next(error);
  }
};

/**
 * Agrega productos al carrito del usuario autenticado
 * Body esperado: { productos: [{ idProducto: string, cantidad: number }] }
 */
export const agregarProductoCarritoController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        mensaje: "Debe proporcionar un array de productos válido",
      });
    }

    for (const item of productos) {
      if (!item.idProducto) {
        return res.status(400).json({
          mensaje: "Cada producto debe tener un idProducto",
        });
      }
    }

    const carritoActualizado = await agregarProductoCarritoService(
      idUsuario,
      productos
    );
    res.json({
      mensaje: "Productos agregados al carrito exitosamente",
      carrito: carritoActualizado,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza la cantidad de un producto específico en el carrito
 * Body esperado: { cantidad: number }
 */
export const actualizarCantidadProductoController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const { idProducto } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({
        mensaje: "La cantidad debe ser un número mayor a 0",
      });
    }

    const carritoActualizado = await actualizarCantidadProductoService(
      idUsuario,
      idProducto,
      cantidad
    );
    res.json({
      mensaje: "Cantidad actualizada exitosamente",
      carrito: carritoActualizado,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un producto del carrito
 */
export const eliminarProductoCarritoController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const { idProducto } = req.params;

    const carritoActualizado = await eliminarProductoCarritoService(
      idUsuario,
      idProducto
    );
    res.json({
      mensaje: "Producto eliminado del carrito exitosamente",
      carrito: carritoActualizado,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Limpia todo el carrito del usuario
 */
export const limpiarCarritoController = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.usuarioId;
    const carritoVacio = await limpiarCarritoService(idUsuario);
    res.json({
      mensaje: "Carrito limpiado exitosamente",
      carrito: carritoVacio,
    });
  } catch (error) {
    next(error);
  }
};
