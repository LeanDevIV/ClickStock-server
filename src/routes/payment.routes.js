import { Router } from "express";
import { crearPreferencia } from "../controllers/payment.controller.js";

const router = Router();
router.post("/crear_preferencia", crearPreferencia);

export default router;