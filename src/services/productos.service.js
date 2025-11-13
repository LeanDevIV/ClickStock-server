import Producto from "../models/Productos.js";

// Servicio para obtener todos los productos
export const obtenerProductosService = async () => {
  const productos = await Producto.find({ isDeleted: false }).populate("categoria");
  return productos;
};

// Servicio para obtener productos por categoría
export const obtenerProductosPorCategoriaService = async (categoriaId) => {
  const productos = await Producto.find({ categoria: categoriaId }).populate("categoria");
  return productos;
};

// Servicio para obtener un producto por ID
export const obtenerProductoPorIdService = async (id) => {
  const producto = await Producto.findOne({ _id: id, isDeleted: false }).populate("categoria");
  return producto;
};

// Servicio para crear un nuevo producto
export const crearProductoService = async (data) => {
  try {
    const producto = new Producto(data);
    await producto.save();
    await producto.populate("categoria");
    return producto;
  } catch (error) {
    console.error("Error creando producto: " + error.message);
  }
};

// Servicio para actualizar un producto existente
export const actualizarProductoService = async (id, datosProducto) => {
  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    datosProducto,
    {
      new: true,
      runValidators: true,
    }
  ).populate("categoria");
  return productoActualizado;
};

// Servicio para eliminar un producto
export const eliminarProductoService = async (id, deletedBy = null) => {
  const producto = await Producto.findById(id);
  if (!producto) return null;
  producto.isDeleted = true;
  producto.deletedBy = deletedBy;
  producto.deletedAt = new Date();
  await producto.save();
  return producto;
};

export const eliminarProductoPermanentService = async (id) => {
  const productoEliminado = await Producto.findByIdAndDelete(id);
  return productoEliminado;
};

export const restaurarProductoService = async (id) => {
  const producto = await Producto.findById(id);
  if (!producto) return null;
  producto.isDeleted = false;
  producto.deletedBy = null;
  producto.deletedAt = null;
  await producto.save();
  return producto;
};
