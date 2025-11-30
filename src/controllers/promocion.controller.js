import * as promocionService from "../services/promocion.service.js";

export const crearPromocion = async (req, res) => {
  try {
    const nuevaPromocion = await promocionService.crearPromocion(req.body);
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
