import { Router } from "express";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";
import {
  obtenerFavoritosController,
  agregarProductoFavoritosController,
  eliminarProductoFavoritosController,
  verificarProductoEnFavoritosController,
  limpiarFavoritosController,
} from "../controllers/favoritos.controller.js";

const router = Router();

router.use(ValidacionDeToken);
router.use(validacionDeRol("usuario", "admin"));

router.get("/", obtenerFavoritosController);

router.post("/", agregarProductoFavoritosController);

router.get("/:idProducto/verificar", verificarProductoEnFavoritosController);

router.delete("/vaciar", limpiarFavoritosController);

router.delete("/:idProducto", eliminarProductoFavoritosController);

export default router;
