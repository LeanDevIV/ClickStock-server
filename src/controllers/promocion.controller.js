import * as promocionService from "../services/promocion.service.js";

export const crearPromocion = async (req, res) => {
  try {
    const nuevaPromocion = await promocionService.crearPromocion(req.body);
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    console.error("Error al crear la promoción:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const obtenerPromociones = async (req, res) => {
  try {
    const { includeDeleted } = req.query;
    const promociones = await promocionService.obtenerPromociones({
      includeDeleted: includeDeleted === "true",
    });
    res.status(200).json(promociones);
  } catch (error) {
    console.error("Error al obtener las promociones:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const obtenerPromocionPorId = async (req, res) => {
  try {
    const promocion = await promocionService.obtenerPromocionPorId(
      req.params.id
    );
    if (!promocion) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }
    res.status(200).json(promocion);
  } catch (error) {
    console.error("Error al obtener la promoción:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const actualizarPromocion = async (req, res) => {
  try {
    const promocionActualizada = await promocionService.actualizarPromocion(
      req.params.id,
      req.body
    );
    if (!promocionActualizada) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }
    res.status(200).json(promocionActualizada);
  } catch (error) {
    console.error("Error al actualizar la promoción:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const eliminarPromocionSuave = async (req, res) => {
  try {
    const deletedBy = req.user ? req.user._id : null;
    const promocionEliminada = await promocionService.eliminarPromocionSuave(
      req.params.id,
      deletedBy
    );
    if (!promocionEliminada) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }
    res.status(200).json({
      message: "Promoción eliminada temporalmente",
      promocion: promocionEliminada,
    });
  } catch (error) {
    console.error("Error al eliminar la promoción:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const restaurarPromocion = async (req, res) => {
  try {
    const promocionRestaurada = await promocionService.restaurarPromocion(
      req.params.id
    );
    if (!promocionRestaurada) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }
    res.status(200).json({
      message: "Promoción restaurada",
      promocion: promocionRestaurada,
    });
  } catch (error) {
    console.error("Error al restaurar la promoción:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const eliminarPromocionPermanente = async (req, res) => {
  try {
    const resultado = await promocionService.eliminarPromocionPermanente(
      req.params.id
    );
    if (!resultado) {
      return res.status(404).json({ message: "Promoción no encontrada" });
    }
    res.status(200).json({ message: "Promoción eliminada permanentemente" });
  } catch (error) {
    console.error("Error al eliminar la promoción permanentemente:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const obtenerPromocionesActivasPublico = async (req, res) => {
  try {
    const promociones = await promocionService.obtenerPromocionesActivas();
    res.status(200).json(promociones);
  } catch (error) {
    console.error("Error al obtener las promociones activas:", error);
    res.status(500).json({ message: error.message });
    next(error);
  }
};
