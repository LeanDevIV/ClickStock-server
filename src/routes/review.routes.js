import { Router } from "express";
import {
  getReviews,
  addReview,
  getAverage,
  removeReview,
} from "../controllers/review.controller.js";

const router = Router();

router.get("/:productId", getReviews);

router.post("/", addReview);

router.get("/average/:productId", getAverage);

router.delete("/:id", removeReview);

export default router;
