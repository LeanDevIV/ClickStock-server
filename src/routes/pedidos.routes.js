import express, { Router } from "express";
import pedidoController from "../controllers/pedidos.Controller.js";

const router = express.Router();
Router.post("/", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);
<<<<<<< HEAD
router.get("/usuario/:usuarioId", pedidoController.obtenerPedidosUsuario);
router.get("/:id", pedidoController.obtenerPedido);
router.put("/:id", pedidoController.actualizarPedido);
router.patch("/:id/estado", pedidoController.actualizarEstado); 
=======
router.get("/usuario/.usuarioId", pedidoController.obtenerPedidosUsuarios);
router.get("/.id", pedidoController.obtenerPedido);
router.post("/:id", pedidoController.actualizarPedido);
router.patch("/:id", pedidoController.actualizarestado);
>>>>>>> parent of 36636c1 (feat:ruteo de pedidos listo,metodos HTTP funcionando y refactorizacion de controlador de pedidos)
router.delete("/:id", pedidoController.eliminarPedido);
export default Router;
