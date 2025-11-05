import express, { Router } from "express";
import pedidoController from "../controllers/pedidos.Controller.js";

const router = express.Router();
Router.post("/", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);
router.get("/usuario/.usuarioId", pedidoController.obtenerPedidosUsuarios);
router.get("/.id", pedidoController.obtenerPedido);
router.post("/:id", pedidoController.actualizarPedido);
router.patch("/:id", pedidoController.actualizarestado);
router.delete("/:id", pedidoController.eliminarPedido);
export default Router;
