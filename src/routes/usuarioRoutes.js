import { Router } from "express";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
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
//import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

router.post("/registro", registroController);
router.post("/login", loginController);
router.use(ValidacionDeToken);
router.get("/", obtenerUsuariosController);

router.put("/:id/rol", cambiarRolUsuarioController);

router.get("/:id", obtenerUsuarioIdController);
router.put("/:id", actualizarUsuarioController);

router.delete("/:id", eliminarUsuarioController);

export default router;
