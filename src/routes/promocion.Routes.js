import { Router } from "express";
import {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocionSuave,
  restaurarPromocion,
  eliminarPromocionPermanente,
} from "../controllers/promocion.controller.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = Router();

router.post("/", ValidacionDeToken, validacionDeRol("admin"), crearPromocion);
router.get("/", obtenerPromociones);
router.get("/:id", obtenerPromocionPorId);
router.put(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  actualizarPromocion
);

// Soft Delete
// Soft Delete
router.delete(
  "/soft/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarPromocionSuave
);

// Restore
router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  restaurarPromocion
);

// Hard Delete
router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarPromocionPermanente
);

export default router;
