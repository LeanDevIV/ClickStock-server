import { Router } from "express";
import {
  obtenerCategoriasController,
  obtenerCategoriaPorIdController,
  crearCategoriaController,
  actualizarCategoriaController,
  eliminarCategoriaController,
} from "../controllers/categorias.controller.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";

const router = Router();

router.get("/", obtenerCategoriasController);

router.get("/:id", obtenerCategoriaPorIdController);

router.post(
  "/",
  ValidacionDeToken,
  validacionDeRol("admin"),
  crearCategoriaController
);

router.put(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  actualizarCategoriaController
);

router.delete(
  "/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  eliminarCategoriaController
);

export default router;
