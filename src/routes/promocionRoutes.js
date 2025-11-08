import express from "express";
import {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocion
} from "../controllers/promocionController.js";

const router = express.Router();

// Crear una promoción
router.post("/", crearPromocion);

// Obtener todas las promociones
router.get("/", obtenerPromociones);

// Obtener una promoción por ID
router.get("/:id", obtenerPromocionPorId);

// Actualizar una promoción
router.put("/:id", actualizarPromocion);

// Eliminar una promoción
router.delete("/:id", eliminarPromocion);

export default router;
