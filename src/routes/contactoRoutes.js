import express from "express";
import {
  crearContacto,
  obtenerContactos,
  actualizarEstadoContacto,
} from "../controllers/contacto.Controller.js";

const router = express.Router();

router.post("/", crearContacto);
router.get("/", obtenerContactos);        
router.put("/:id", actualizarEstadoContacto);

export default router;
