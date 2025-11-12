import { Router } from "express";
import {
  obtenerCategoriasController,
  obtenerCategoriaPorIdController,
  crearCategoriaController,
  actualizarCategoriaController,
  eliminarCategoriaController,
  desactivarCategoriaController,
} from "../controllers/categorias.controller.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = Router();

router.get("/", obtenerCategoriasController);

router.get("/:id", obtenerCategoriaPorIdController);

// ------- solo admin ------------
router.post("/", validacionDeRol("admin"), crearCategoriaController);

router.put("/:id", validacionDeRol("admin"), actualizarCategoriaController);

router.patch(
  "/:id/desactivar",
  validacionDeRol("admin"),
  desactivarCategoriaController
);

router.delete("/:id", validacionDeRol("admin"), eliminarCategoriaController);
// -------------------------------

export default router;
