import Promocion from "../models/Promocion.js";
import AppError from "../utils/AppError.js";

export const crearPromocionService = async (data) => {
  try {
    const nuevaPromocion = new Promocion(data);
    return await nuevaPromocion.save();
  } catch (error) {
    throw new AppError("Error al crear la promoción", 500);
  }
};

export const obtenerPromocionesService = async () => {
  try {
    return await Promocion.find().populate("productos");
  } catch (error) {
    throw new AppError("Error al obtener las promociones", 500);
  }
};

export const obtenerPromocionPorIdService = async (id) => {
  try {
    return await Promocion.findById(id).populate("productos");
  } catch (error) {
    throw new AppError("Error al obtener la promoción", 500);
  }
};

export const actualizarPromocionService = async (id, data) => {
  try {
    return await Promocion.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new AppError("Error al actualizar la promoción", 500);
  }
};

export const eliminarPromocionService = async (id) => {
  try {
    return await Promocion.findByIdAndDelete(id);
  } catch (error) {
    throw new AppError("Error al eliminar la promoción", 500);
  }
};
