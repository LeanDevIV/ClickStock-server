import { Router } from "express";
import {
  crearNuevoContacto,
  obtenerTodos,
  obtenerPorId,
  actualizarPorId,
  eliminarPorId
} from "../controllers/contacto.controller.js";
import { validarContacto } from "../middleware/validarContacto.js";

const router = Router();

router.post("/",validarContacto, crearNuevoContacto);
router.get("/", obtenerTodos);
router.get("/:id", obtenerPorId);
router.put("/:id",validarContacto, actualizarPorId);
router.delete("/:id", eliminarPorId);

export default router;
