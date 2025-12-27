import * as categoriasService from "../services/categorias.service.js";

export const obtenerCategoriasController = async (req, res, next) => {
  try {
    const categorias = await categoriasService.obtenerTodasLasCategorias();
    res.status(200).json({
      success: true,
      data: categorias,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerCategoriaPorIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    let categoria;
    if (mongoose.Types.ObjectId.isValid(id)) {
      categoria = await categoriasService.obtenerCategoriaPorId(id);
    } else {
      categoria = await categoriasService.obtenerCategoriaPorSlug(id);
    }
    res.status(200).json({
      success: true,
      data: categoria,
    });
  } catch (error) {
    next(error);
  }
};

export const crearCategoriaController = async (req, res, next) => {
  try {
    const { nombre, descripcion, imagen } = req.body;
    const nuevaCategoria = await categoriasService.crearCategoria({
      nombre,
      descripcion,
      imagen,
    });
    res.status(201).json({
      success: true,
      data: nuevaCategoria,
      message: "Categoría creada exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarCategoriaController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, imagen, activa } = req.body;
    const categoriaActualizada = await categoriasService.actualizarCategoria(
      id,
      {
        nombre,
        descripcion,
        imagen,
        activa,
      }
    );
    res.status(200).json({
      success: true,
      data: categoriaActualizada,
      message: "Categoría actualizada exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarCategoriaController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoriaEliminada = await categoriasService.eliminarCategoria(id);
    res.status(200).json({
      success: true,
      data: categoriaEliminada,
      message: "Categoría eliminada exitosamente",
    });
  } catch (error) {
    next(error);
  }
};
