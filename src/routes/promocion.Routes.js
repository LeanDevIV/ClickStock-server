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
import { validateSchema } from "../middleware/zodValidator.js";
import {
  promocionSchema,
  promocionUpdateSchema,
} from "../schemas/business.schema.js";

const router = Router();

router.post(
  "/",
  ValidacionDeToken,
  validacionDeRol("admin"),
  validateSchema(promocionSchema),
  crearPromocion
);
router.get("/", obtenerPromociones);
router.get("/:id", obtenerPromocionPorId);
router.put(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  validateSchema(promocionUpdateSchema),
  actualizarPromocion
);

router.delete(
  "/soft/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarPromocionSuave
);

router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  restaurarPromocion
);

router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarPromocionPermanente
);

export default router;
