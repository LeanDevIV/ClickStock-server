import express, { Router } from "express";
import pedidoController from "../controllers/pedidos.Controller.js";

const router = express.Router();


router.post("/", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);
router.get("/usuario/:usuarioId", pedidoController.obtenerPedidosUsuario); // ← Usuarios con S
router.get("/:id", pedidoController.obtenerPedido);
router.put("/:id", pedidoController.actualizarPedido);
router.patch("/:id/estado", pedidoController.actualizarEstado); // ← actualizarestado
router.delete("/:id", pedidoController.eliminarPedido);

export default router;