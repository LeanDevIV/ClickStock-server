import { Router } from "express";
import {
  obtenerCategoriasController,
  obtenerCategoriaPorIdController,
  crearCategoriaController,
  actualizarCategoriaController,
  eliminarCategoriaController,
} from "../controllers/categorias.controller.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = Router();

router.get("/", obtenerCategoriasController);

router.get("/:id", obtenerCategoriaPorIdController);

router.post("/", validacionDeRol("admin"), crearCategoriaController);

router.put("/:id", validacionDeRol("admin"), actualizarCategoriaController);

router.delete("/:id", validacionDeRol("admin"), eliminarCategoriaController);

export default router;
