import { Router } from "express";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import {
  actualizarUsuarioController,
  cambiarRolUsuarioController,
  eliminarUsuarioController,
  eliminarUsuarioPermanenteController,
  obtenerUsuarioIdController,
  obtenerUsuariosController,
  loginController,
  registroController,
  restaurarUsuarioController,
} from "../controllers/usuario.controller.js";
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
// Ruta para borrado permanente
router.delete("/permanent/:id", validacionDeRol("admin"), eliminarUsuarioPermanenteController);
// Restaurar usuario
router.patch("/restore/:id", validacionDeRol("admin"), restaurarUsuarioController);

export default router;
