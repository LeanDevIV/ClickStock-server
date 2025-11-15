import express from "express";
import {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocion
} from "../controllers/promocion.controller.js";

const router = express.Router();

router.post("/", crearPromocion);
router.get("/", obtenerPromociones);
router.get("/:id", obtenerPromocionPorId);
router.put("/:id", actualizarPromocion);
router.delete("/:id", eliminarPromocion);

export default router;
