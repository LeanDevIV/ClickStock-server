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

// ⚠️ RUTAS ESPECÍFICAS (deben estar ANTES que las genéricas /:id)
// Si están después, Express matcheará /:id primero y nunca llegará a estas

// Borrado permanente (DELETE /permanent/:id)
router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarProductoPermanenteController
);

// Restaurar producto (PATCH /restore/:id)
router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  restaurarProductoController
);

// ⚠️ RUTAS GENÉRICAS (después de las específicas)
// GET /:id
router.get("/:id", obtenerProductoPorIdController);

// POST / - crear
router.post(
  "/",
  ValidacionDeToken,
  validacionDeRol("usuario"),
  crearProductoController
);

// PUT /:id - actualizar
router.put(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  actualizarProductoController
);

// PATCH /:id - actualizar parcialmente
router.patch(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  actualizarProductoController
);

// DELETE /:id - soft delete
router.delete(
  "/soft/:id",
  ValidacionDeToken,
  validacionDeRol("usuario", "admin"),
  eliminarProductoController
);

export default router;
