import {
  obtenerProductosService,
  obtenerProductoPorIdService,
  crearProductoService,
  actualizarProductoService,
  eliminarProductoService,
  eliminarProductoPermanentService,
  restaurarProductoService,
  obtenerProductosPorCategoriaService,
} from "../services/productos.service.js";

export const obtenerProductosController = async (req, res) => {
  try {
    const { includeDeleted, includeUnavailable, search, destacado } = req.query;
    const options = {
      includeDeleted: includeDeleted === "true",
      includeUnavailable: includeUnavailable === "true",
      destacado: destacado === "true",
      search,
    };
    const productos = await obtenerProductosService(options);
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
    next(error);
  }
};

export const obtenerProductosPorCategoriaController = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const productos = await obtenerProductosPorCategoriaService(categoriaId);
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos por categoría:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los productos por categoría" });
    next(error);
  }
};

export const obtenerProductoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorIdService(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
    next(error);
  }
};

export const crearProductoController = async (req, res, next) => {
  try {
    const productoGuardado = await crearProductoService(req.body);
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(400).json({ error: "Error al crear el producto" });
    next(error);
  }
};

export const actualizarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await actualizarProductoService(id, req.body);
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(400).json({ error: "Error al actualizar el producto" });
    next(error);
  }
};

export const eliminarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBy = req.usuario?.usuarioId || req.usuario?._id || null;

    const productoEliminado = await eliminarProductoService(id, deletedBy);

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      mensaje: "Producto eliminado correctamente",
      producto: productoEliminado,
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res
      .status(400)
      .json({ error: "Error al eliminar el producto", details: error.message });
    next(error);
  }
};

export const eliminarProductoPermanenteController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await eliminarProductoPermanentService(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado permanentemente" });
  } catch (error) {
    console.error("Error al eliminar el producto permanentemente:", error);
    res
      .status(400)
      .json({ error: "Error al eliminar el producto permanentemente" });
    next(error);
  }
};

export const restaurarProductoController = async (req, res) => {
  try {
    const { id } = req.params;

    const productoRestaurado = await restaurarProductoService(id);

    if (!productoRestaurado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      mensaje: "Producto restaurado correctamente",
      producto: productoRestaurado,
    });
  } catch (error) {
    console.error("Error al restaurar el producto:", error);
    res.status(500).json({
      error: "Error al restaurar el producto",
      details: error.message,
    });
    next(error);
  }
};
