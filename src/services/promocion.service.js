import Promocion from "../models/promocion.js";

export const crearPromocion = async (datos) => {
  const nuevaPromocion = new Promocion(datos);
  return await nuevaPromocion.save();
};

export const obtenerPromociones = async (options = {}) => {
  const { includeDeleted = false } = options;
  const filter = {};
  if (!includeDeleted) {
    filter.isDeleted = false;
  }
  return await Promocion.find(filter).populate("productos");
};

export const obtenerPromocionPorId = async (id) => {
  return await Promocion.findById(id).populate("productos");
};

export const actualizarPromocion = async (id, datos) => {
  return await Promocion.findByIdAndUpdate(id, datos, { new: true });
};

export const eliminarPromocionSuave = async (id, deletedBy) => {
  return await Promocion.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      deletedBy: deletedBy,
      deletedAt: new Date(),
      activa: false, // Desactivar la promoción al eliminarla
    },
    { new: true }
  );
};

export const restaurarPromocion = async (id) => {
  return await Promocion.findByIdAndUpdate(
    id,
    {
      isDeleted: false,
      deletedBy: null,
      deletedAt: null,
      activa: true, // Reactivar la promoción al restaurarla (opcional)
    },
    { new: true }
  );
};

export const eliminarPromocionPermanente = async (id) => {
  return await Promocion.findByIdAndDelete(id);
};
