import {
  obtenerProductosService,
  obtenerProductoPorIdService,
  crearProductoService,
  actualizarProductoService,
  eliminarProductoService,
} from "../services/productos.service.js";

// Obtener todos los productos
export const obtenerProductosController = async (req, res) => {
  try {
    const productos = await obtenerProductosService();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Obtener un producto por ID
export const obtenerProductoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorIdService(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Crear un nuevo producto
export const crearProductoController = async (req, res, next) => {
  try {
    const productoGuardado = await crearProductoService(req.body);
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
    next();
  }
};

// Actualizar un producto existente
export const actualizarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await actualizarProductoService(id, req.body);
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
export const eliminarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await eliminarProductoService(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el producto" });
  }
};
