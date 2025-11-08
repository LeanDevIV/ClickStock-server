import express from "express";
import pedidoController from "../controllers/pedidos.Controller.js";
import pedidoService from "../services/pedidos.service.js"; // 👈 AGREGAR ESTO

const router = express.Router();

router.post("/", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);
router.get("/usuario/:usuarioId", pedidoController.obtenerPedidosUsuario);
router.get("/:id", pedidoController.obtenerPedido);
router.put("/:id", pedidoController.actualizarPedido);
router.patch("/:id/estado", pedidoController.actualizarEstado);
router.delete("/:id", pedidoController.eliminarPedido);

export default router;
