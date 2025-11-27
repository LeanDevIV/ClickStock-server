import Promocion from "../models/Promocion.js";

export const crearPromocion = async (datos) => {
  if (datos.fechaInicio && datos.fechaFin) {
    if (new Date(datos.fechaFin) < new Date(datos.fechaInicio)) {
      throw new Error(
        "La fecha de fin no puede ser anterior a la fecha de inicio"
      );
    }
  }
  const nuevaPromocion = new Promocion(datos);
  return await nuevaPromocion.save();
};

export const obtenerPromociones = async (options = {}) => {
  const { includeDeleted = false } = options;
  const filter = {};
  if (!includeDeleted) {
    filter.isDeleted = false;
  }
  const promociones = await Promocion.find(filter).populate("productos");

  // Verificar y actualizar estado de promociones expiradas
  const now = new Date();
  const promocionesActualizadas = await Promise.all(
    promociones.map(async (p) => {
      if (p.activa && p.fechaFin && new Date(p.fechaFin) < now) {
        p.activa = false;
        await p.save();
      }
      return p;
    })
  );

  return promocionesActualizadas;
};

export const obtenerPromocionPorId = async (id) => {
  return await Promocion.findById(id).populate("productos");
};

export const actualizarPromocion = async (id, datos) => {
  if (datos.fechaInicio && datos.fechaFin) {
    if (new Date(datos.fechaFin) < new Date(datos.fechaInicio)) {
      throw new Error(
        "La fecha de fin no puede ser anterior a la fecha de inicio"
      );
    }
  }
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
