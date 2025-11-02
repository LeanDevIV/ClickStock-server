import { Router } from "express";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";
import {
  obtenerCarritoController,
  agregarProductoCarritoController,
  actualizarCantidadProductoController,
  eliminarProductoCarritoController,
  limpiarCarritoController,
} from "../controllers/carrito.Controller.js";

const router = Router();

router.use(ValidacionDeToken);
router.use(validacionDeRol("usuario", "admin"));

router.get("/", obtenerCarritoController);

router.post("/", agregarProductoCarritoController);

router.put("/:idProducto", actualizarCantidadProductoController);

router.delete("/vaciar", limpiarCarritoController);

router.delete("/:idProducto", eliminarProductoCarritoController);

export default router;
