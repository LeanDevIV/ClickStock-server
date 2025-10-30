import Producto from "../models/Productos.js";

// Servicio para obtener todos los productos
export const obtenerProductosService = async () => {
  const productos = await Producto.find();
  return productos;
};

// Servicio para obtener un producto por ID
export const obtenerProductoPorIdService = async (id) => {
  const producto = await Producto.findById(id);
  return producto;
};

// Servicio para crear un nuevo producto
export const crearProductoService = async (data) => {
  try {
    const producto = new Producto(data);
    await producto.save();
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
  );
  return productoActualizado;
};

// Servicio para eliminar un producto
export const eliminarProductoService = async (id) => {
  const productoEliminado = await Producto.findByIdAndDelete(id);
  return productoEliminado;
};
