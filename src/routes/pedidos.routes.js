import express from "express";
import pedidoController from "../controllers/pedido.controller.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = express.Router();

router.post("/", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);
router.get("/usuario/:usuarioId", pedidoController.obtenerPedidosUsuario);
router.get("/:id", pedidoController.obtenerPedido);
router.put("/:id", pedidoController.actualizarPedido);
router.patch("/:id/estado", pedidoController.actualizarEstado);
router.delete("/:id", ValidacionDeToken, pedidoController.eliminarPedido);
// Borrado permanente (solo admin)
router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.eliminarPedidoPermanente
);
// Restaurar pedido (solo admin)
router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.restaurarPedido
);

export default router;
