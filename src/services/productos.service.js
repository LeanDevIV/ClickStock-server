import Producto from "../models/Productos.js";
import { deleteFile } from "../utils/upload.util.js";

export const obtenerProductosService = async (options = {}) => {
  const {
    includeDeleted = false,
    includeUnavailable = false,
    search = "",
    destacado = false,
  } = options;

  const query = {};
  if (!includeDeleted) {
    query.isDeleted = false;
  }
  if (!includeUnavailable) {
    query.disponible = true;
  }
  if (destacado) {
    query.destacado = true;
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

export const obtenerProductoPorIdService = async (id) => {
  const producto = await Producto.findOne({ _id: id, isDeleted: false })
    .populate("categoria")
    .populate("deletedBy", "nombre apellido correo");
  return producto;
};

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

export const actualizarProductoService = async (id, datosProducto) => {
  const productoAnterior = await Producto.findById(id);

  if (productoAnterior && productoAnterior.imagenes) {
    const nuevasImagenes = datosProducto.imagenes || [];

    const imagenesAEliminar = productoAnterior.imagenes.filter(
      (imgUrl) => !nuevasImagenes.includes(imgUrl)
    );

    if (imagenesAEliminar.length > 0) {
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

export const eliminarProductoPermanentService = async (id) => {
  const producto = await Producto.findById(id);

  if (producto && producto.imagenes && producto.imagenes.length > 0) {
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
