import { Router } from "express";
import {
  crearNuevoContacto,
  obtenerTodos,
  obtenerPorId,
  actualizarPorId,
  eliminarPorId
} from "../controllers/contacto.controller.js";

const router = Router();

router.post("/", crearNuevoContacto);
router.get("/", obtenerTodos);
router.get("/:id", obtenerPorId);
router.put("/:id", actualizarPorId);
router.delete("/:id", eliminarPorId); // ✅ elimina contacto

export default router;
