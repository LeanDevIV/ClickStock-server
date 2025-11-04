import { Router } from "express";
import {
  getReviews,
  addReview,
  getAverage,
  removeReview,
} from "../controllers/reviewController.js";

const router = Router();

// GET todas las reseñas de un producto
router.get("/:productId", getReviews);

// POST nueva reseña
router.post("/", addReview);

// GET promedio de calificaciones
router.get("/average/:productId", getAverage);

// DELETE reseña por id (opcional)
router.delete("/:id", removeReview);

export default router;
