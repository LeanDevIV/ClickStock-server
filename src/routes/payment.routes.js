import { Router } from "express";
import { body } from "express-validator";
import {
  crearPreferencia,
  receiveWebhook,
} from "../controllers/payment.controller.js";

const router = Router();
const validarCrearPreferencia = [
  body("productos")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un producto"),

  body("productos.*.precio")
    .isNumeric()
    .withMessage("El precio debe ser un número"),

  body("productos.*.cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor a 0"),

  body("usuario.emailUsuario").isEmail().withMessage("Email debe ser válido"),
];

router.post("/crear_preferencia", validarCrearPreferencia, crearPreferencia);
router.post("/webhook", receiveWebhook);

export default router;
