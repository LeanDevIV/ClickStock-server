import { Router } from "express";
import {
  actualizarUsuarioController,
  cambiarRolUsuarioController,
  eliminarUsuarioController,
  obtenerUsuarioIdController,
  obtenerUsuariosController,
  loginController,
  registroController,
} from "../controllers/userController.js";

//Pendiente
//import { authMiddleware } from "../middlewares/authMiddleware.js";
//import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

//Pendiente
// Todas las rutas de usuario requieren estar autenticado
//router.use(authMiddleware);
router.post("/registro", registroController);
router.post("/login", loginController);


router.get("/", obtenerUsuariosController);

router.put("/:id/rol", cambiarRolUsuarioController);

router.get("/:id", obtenerUsuarioIdController);
router.put("/:id", actualizarUsuarioController);

router.delete("/:id", eliminarUsuarioController);

export default router;
