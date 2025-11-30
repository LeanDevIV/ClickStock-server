import express from "express";
import pedidoController from "../controllers/pedido.controller.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = express.Router();
router.get(
  "/mis-pedidos",
  ValidacionDeToken,
  pedidoController.obtenerPedidosUsuario
);

router.post("/", ValidacionDeToken, pedidoController.crearPedido);
router.get(
  "/",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.obtenerPedidos
);
router.get("/:id", ValidacionDeToken, pedidoController.obtenerPedido);
router.put("/:id", ValidacionDeToken, pedidoController.actualizarPedido);
router.patch(
  "/:id/estado",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.actualizarEstado
);
router.delete("/:id", ValidacionDeToken, pedidoController.eliminarPedido);
router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.eliminarPedidoPermanente
);
router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.restaurarPedido
);

export default router;
