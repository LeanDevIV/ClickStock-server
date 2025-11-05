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
import { validacionDeRol } from "../middleware/validacionDeRol.js";
const router = Router();

router.post("/registro", registroController);
router.post("/login", loginController);

router.use(ValidacionDeToken);
router.get("/", validacionDeRol("usuario", "admin"), obtenerUsuariosController);

router.put("/:id/rol", validacionDeRol("admin"), cambiarRolUsuarioController);

router.get(
  "/:id",
  validacionDeRol("usuario", "admin"),
  obtenerUsuarioIdController
);
router.put("/:id", validacionDeRol("admin"), actualizarUsuarioController);

router.delete("/:id", validacionDeRol("admin"), eliminarUsuarioController);

export default router;
