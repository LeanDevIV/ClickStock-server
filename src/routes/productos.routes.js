import { Router } from "express";
import {
  obtenerProductosController,
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController,
  eliminarProductoPermanenteController,
  restaurarProductoController,
  obtenerProductosPorCategoriaController,
} from "../controllers/productos.controller.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = Router();

// Rutas GET
router.get("/", obtenerProductosController);
router.get("/categoria/:categoriaId", obtenerProductosPorCategoriaController);

router.put(
  "/soft/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  eliminarProductoController
);

router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),

  eliminarProductoPermanenteController
);

router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),

  restaurarProductoController
);

router.get("/:id", obtenerProductoPorIdController);

router.post(
  "/",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  crearProductoController
);

router.put(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  actualizarProductoController
);

router.patch(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  actualizarProductoController
);

export default router;
