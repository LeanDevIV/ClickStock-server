import { Router } from "express";
import {
  getReviews,
  addReview,
  getAverage,
  removeReview,
  removeReviewPermanent,
  restaurarReviewController,
} from "../controllers/review.controller.js";
import { ValidacionDeToken } from "../middleware/validacionDeToken.js";
import { validacionDeRol } from "../middleware/validacionDeRol.js";

const router = Router();

// GET todas las reseñas de un producto
router.get("/:productId", getReviews);

// POST nueva reseña
router.post("/", addReview);

// GET promedio de calificaciones
router.get("/average/:productId", getAverage);

// DELETE reseña por id (opcional)
router.delete("/:id", removeReview);
// Borrado permanente (solo admin)
router.delete("/permanent/:id", ValidacionDeToken, validacionDeRol("admin"), removeReviewPermanent);
// Restaurar reseña (solo admin)
router.patch("/restore/:id", ValidacionDeToken, validacionDeRol("admin"), restaurarReviewController);

export default router;
