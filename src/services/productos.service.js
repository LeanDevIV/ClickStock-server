import Producto from "../models/Productos.js";

// Servicio para obtener todos los productos
export const obtenerProductosService = async (options = {}) => {
  const {
    includeDeleted = false,
    includeUnavailable = false,
    search = "",
  } = options;

  const query = {};
  if (!includeDeleted) {
    query.isDeleted = false;
  }
  if (!includeUnavailable) {
    query.disponible = true;
  }

  if (search) {
    query.$or = [
      { nombre: { $regex: search, $options: "i" } },
      { descripcion: { $regex: search, $options: "i" } },
    ];
  }

  const productos = await Producto.find(query)
    .populate("categoria")
    .populate("deletedBy", "nombreUsuario emailUsuario");
  return productos;
};
export const obtenerProductosPorCategoriaService = async (categoriaId) => {
  const productos = await Producto.find({ categoria: categoriaId })
    .populate("categoria")
    .populate("deletedBy", "nombreUsuario emailUsuario");
  return productos;
};

// Servicio para obtener un producto por ID
export const obtenerProductoPorIdService = async (id) => {
  const producto = await Producto.findOne({ _id: id, isDeleted: false })
    .populate("categoria")
    .populate("deletedBy", "nombreUsuario emailUsuario");
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
  )
    .populate("categoria")
    .populate("deletedBy", "nombreUsuario emailUsuario");
  return productoActualizado;
};

// Servicio para eliminar un producto
export const eliminarProductoService = async (id, deletedBy = null) => {
  const producto = await Producto.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      disponible: false,
      deletedBy: deletedBy,
      deletedAt: new Date(),
    },
    { new: true }
  ).populate("deletedBy", "nombreUsuario emailUsuario");

  return producto;
};

export const eliminarProductoPermanentService = async (id) => {
  const productoEliminado = await Producto.findByIdAndDelete(id);
  return productoEliminado;
};

export const restaurarProductoService = async (id) => {
  const producto = await Producto.findByIdAndUpdate(
    id,
    {
      isDeleted: false,
      disponible: true,
      deletedBy: null,
      deletedAt: null,
    },
    { new: true }
  ).populate("deletedBy", "nombreUsuario emailUsuario");

  return producto;
};
