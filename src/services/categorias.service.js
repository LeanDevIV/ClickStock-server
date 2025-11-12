import CategoriaModel from "../models/Categoria.js";
import AppError from "../utils/AppError.js";

export const obtenerTodasLasCategorias = async () => {
  const categorias = await CategoriaModel.find({ activa: true });
  return categorias;
};

export const obtenerCategoriaPorId = async (id) => {
  const categoria = await CategoriaModel.findById(id);
  if (!categoria) {
    throw new AppError("Categoría no encontrada", 404);
  }
  return categoria;
};
export const obtenerCategoriaPorSlug = async (slug) => {
  const categoria = await CategoriaModel.findOne({ slug });
  if (!categoria) {
    throw new AppError("Categoría no encontrada", 404);
  }
    return categoria;
};

export const crearCategoria = async (datos) => {
  const { nombre, descripcion, imagen } = datos;

  if (!nombre) {
    throw new AppError("El nombre de la categoría es requerido", 400);
  }

  const categoriaExistente = await CategoriaModel.findOne({ nombre });
  if (categoriaExistente) {
    throw new AppError("Ya existe una categoría con ese nombre", 409);
  }

  const nuevaCategoria = new CategoriaModel({
    nombre,
    descripcion: descripcion || "",
    imagen: imagen || "",
  });

  await nuevaCategoria.save();
  return nuevaCategoria;
};

export const actualizarCategoria = async (id, datos) => {
  const { nombre, descripcion, imagen, activa } = datos;

  if (nombre) {
    const categoriaExistente = await CategoriaModel.findOne({
      nombre,
      _id: { $ne: id },
    });
    if (categoriaExistente) {
      throw new AppError("Ya existe otra categoría con ese nombre", 409);
    }
  }

  const categoriaActualizada = await CategoriaModel.findByIdAndUpdate(
    id,
    {
      ...(nombre && { nombre }),
      ...(descripcion && { descripcion }),
      ...(imagen && { imagen }),
      ...(activa !== undefined && { activa }),
    },
    { new: true, runValidators: true,context: 'query' }
  );

  if (!categoriaActualizada) {
    throw new AppError("Categoría no encontrada", 404);
  }

  return categoriaActualizada;
};

export const eliminarCategoria = async (id) => {
  const categoria = await CategoriaModel.findByIdAndUpdate(
    id,
    { activa: false },
    { new: true }
  );
  if (!categoria) throw new AppError("Categoría no encontrada", 404);
  return categoria;
};
export const desactivarCategoria = async (id) => {
  const categoriaDesactivada = await CategoriaModel.findByIdAndUpdate(
    id,
    { activa: false },
    { new: true }
  );

  if (!categoriaDesactivada) {
    throw new AppError("Categoría no encontrada", 404);
  }

  return categoriaDesactivada;
};
