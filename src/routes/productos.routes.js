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
import { validateSchema } from "../middleware/zodValidator.js";
import {
  productoSchema,
  productoUpdateSchema,
} from "../schemas/business.schema.js";

const router = Router();

router.get("/", obtenerProductosController);
router.get("/categoria/:categoriaId", obtenerProductosPorCategoriaController);

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
  validateSchema(productoSchema),
  crearProductoController
);

router.put(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  validateSchema(productoUpdateSchema),
  actualizarProductoController
);

router.patch(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  validateSchema(productoUpdateSchema),
  actualizarProductoController
);

router.delete(
  "/soft/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  eliminarProductoController
);

export default router;
