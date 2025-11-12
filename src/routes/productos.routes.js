import { Router } from "express";
import {
  obtenerProductosController,
  obtenerProductoPorIdController,
  crearProductoController,
  actualizarProductoController,
  eliminarProductoController,
  obtenerProductosPorCategoriaController
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/", obtenerProductosController);

router.get("/categoria/:categoriaId", obtenerProductosPorCategoriaController);

router.get("/:id", obtenerProductoPorIdController);

router.post("/", crearProductoController);

router.put("/:id", actualizarProductoController);

router.delete("/:id", eliminarProductoController);

export default router;
