import { Router } from "express";
import { subirArchivoController } from "../controllers/upload.controller.js";

const router = Router();

/**
 * Ruta para subir archivos
 * POST /api/uploads/:directorio
 * Ejemplo: POST /api/uploads/productos
 * Body: FormData con campo 'file'
 */
router.post("/:directorio", subirArchivoController);

export default router;
