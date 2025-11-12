import {
  crearPromocionService,
  obtenerPromocionesService,
  obtenerPromocionPorIdService,
  actualizarPromocionService,
  eliminarPromocionService
} from "../services/promocion.service.js";

// 🟢 Crear una nueva promoción
export const crearPromocion = async (req, res) => {
  try {
    const promocion = await crearPromocionService(req.body);
    res.status(201).json({ mensaje: "Promoción creada correctamente", promocion });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la promoción", error: error.message });
  }
};

// 🟡 Obtener todas las promociones
export const obtenerPromociones = async (req, res) => {
  try {
    const promociones = await obtenerPromocionesService();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las promociones", error: error.message });
  }
};

// 🔵 Obtener una promoción por ID
export const obtenerPromocionPorId = async (req, res) => {
  try {
    const promocion = await obtenerPromocionPorIdService(req.params.id);
    if (!promocion) return res.status(404).json({ mensaje: "Promoción no encontrada" });
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la promoción", error: error.message });
  }
};

// 🟠 Actualizar una promoción
export const actualizarPromocion = async (req, res) => {
  try {
    const promocionActualizada = await actualizarPromocionService(req.params.id, req.body);
    if (!promocionActualizada) return res.status(404).json({ mensaje: "Promoción no encontrada" });
    res.json({ mensaje: "Promoción actualizada correctamente", promocion: promocionActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la promoción", error: error.message });
  }
};

// 🔴 Eliminar una promoción
export const eliminarPromocion = async (req, res) => {
  try {
    const promocionEliminada = await eliminarPromocionService(req.params.id);
    if (!promocionEliminada) return res.status(404).json({ mensaje: "Promoción no encontrada" });
    res.json({ mensaje: "Promoción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la promoción", error: error.message });
  }
};
