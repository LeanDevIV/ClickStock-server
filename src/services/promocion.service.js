import Promocion from "../models/Promocion.js";

export const crearPromocionService = async (data) => {
  const nuevaPromocion = new Promocion(data);
  return await nuevaPromocion.save();
};

export const obtenerPromocionesService = async () => {
  return await Promocion.find().populate("productos");
};

export const obtenerPromocionPorIdService = async (id) => {
  return await Promocion.findById(id).populate("productos");
};

export const actualizarPromocionService = async (id, data) => {
  return await Promocion.findByIdAndUpdate(id, data, { new: true });
};

export const eliminarPromocionService = async (id) => {
  return await Promocion.findByIdAndDelete(id);
};
