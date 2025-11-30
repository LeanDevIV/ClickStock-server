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
import { validateSchema } from "../middleware/zodValidator.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/registro", validateSchema(registerSchema), registroController);
router.post("/login", validateSchema(loginSchema), loginController);

router.use(ValidacionDeToken);
router.get("/", validacionDeRol("usuario", "admin"), obtenerUsuariosController);

router.put("/:id/rol", validacionDeRol("admin"), cambiarRolUsuarioController);

router.get(
  "/:id",
  validacionDeRol("usuario", "admin"),
  obtenerUsuarioIdController
);
router.put(
  "/:id",
  validacionDeRol("admin", "usuario"),
  actualizarUsuarioController
);

router.delete("/:id", validacionDeRol("admin"), eliminarUsuarioController);

router.delete(
  "/permanent/:id",
  validacionDeRol("admin"),
  eliminarUsuarioPermanenteController
);

router.patch(
  "/restore/:id",
  validacionDeRol("admin"),
  restaurarUsuarioController
);

export default router;
