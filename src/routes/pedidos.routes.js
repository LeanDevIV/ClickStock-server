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

// 2. OBTENER TODOS: Solo ADMIN puede ver TODOS los pedidos
router.get(
  "/",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.obtenerPedidos
);

// 4. OBTENER UN PEDIDO: Solo requiere token
router.get("/:id", ValidacionDeToken, pedidoController.obtenerPedido);

// 5. ACTUALIZAR PEDIDO: Solo ADMIN o el propietario pueden actualizar (Implementación de seguridad en el controlador)
router.put("/:id", ValidacionDeToken, pedidoController.actualizarPedido);

// 6. ACTUALIZAR ESTADO: Solo ADMIN puede cambiar el estado del flujo
router.patch(
  "/:id/estado",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.actualizarEstado
);

// 7. ELIMINAR (Soft Delete): Requiere token
router.delete("/:id", ValidacionDeToken, pedidoController.eliminarPedido);

// Borrado permanente (solo admin) - Ya estaba bien
router.delete(
  "/permanent/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.eliminarPedidoPermanente
);
// Restaurar pedido (solo admin) - Ya estaba bien
router.patch(
  "/restore/:id",
  ValidacionDeToken,
  validacionDeRol("admin"),
  pedidoController.restaurarPedido
);

export default router;
