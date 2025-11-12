import { Router } from "express";
import {
  obtenerProductosController,
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController,
  eliminarProductoPermanenteController,
  restaurarProductoController,
} from "../controllers/productos.controller.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = Router();

router.get("/", obtenerProductosController);

router.get("/:id", obtenerProductoPorIdController);

router.post("/", crearProductoController);

router.put("/:id", actualizarProductoController);

router.delete("/:id", ValidacionDeToken, eliminarProductoController);
// Borrado permanente (solo admin)
router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarProductoPermanenteController
);
// Restaurar producto (solo admin)
router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  restaurarProductoController
);

export default router;
