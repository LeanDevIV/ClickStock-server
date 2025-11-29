import Producto from "../models/Productos.js";
import { deleteFile } from "../utils/upload.util.js";

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
    .populate("deletedBy", "nombre apellido correo");
  return productos;
};
export const obtenerProductosPorCategoriaService = async (categoriaId) => {
  const productos = await Producto.find({ categoria: categoriaId })
    .populate("categoria")
    .populate("deletedBy", "nombre apellido correo");
  return productos;
};

// Servicio para obtener un producto por ID
export const obtenerProductoPorIdService = async (id) => {
  const producto = await Producto.findOne({ _id: id, isDeleted: false })
    .populate("categoria")
    .populate("deletedBy", "nombre apellido correo");
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
  // Obtener producto anterior para comparar imágenes
  const productoAnterior = await Producto.findById(id);

  if (productoAnterior && productoAnterior.imagenes) {
    const nuevasImagenes = datosProducto.imagenes || [];

    // Identificar imágenes que estaban antes pero ya no están en la nueva lista
    const imagenesAEliminar = productoAnterior.imagenes.filter(
      (imgUrl) => !nuevasImagenes.includes(imgUrl)
    );

    // Eliminar las imágenes removidas de Vercel Blob
    if (imagenesAEliminar.length > 0) {
      console.log(
        `Eliminando ${imagenesAEliminar.length} imágenes obsoletas de Blob...`
      );
      // Usamos Promise.allSettled para que si falla una no detenga las demás
      await Promise.allSettled(imagenesAEliminar.map((url) => deleteFile(url)));
    }
  }

  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    datosProducto,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("categoria")
    .populate("deletedBy", "nombre apellido correo");
  return productoActualizado;
};

// Servicio para eliminar un producto (Soft Delete)
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
  ).populate("deletedBy", "nombre apellido correo");

  return producto;
};

// Servicio para eliminar un producto permanentemente (Hard Delete)
export const eliminarProductoPermanentService = async (id) => {
  // Obtener el producto antes de borrarlo para tener acceso a sus imágenes
  const producto = await Producto.findById(id);

  if (producto && producto.imagenes && producto.imagenes.length > 0) {
    console.log(
      `Eliminando ${producto.imagenes.length} imágenes de Blob por borrado permanente...`
    );
    await Promise.allSettled(producto.imagenes.map((url) => deleteFile(url)));
  }

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
  ).populate("deletedBy", "nombre apellido correo");

  return producto;
};
