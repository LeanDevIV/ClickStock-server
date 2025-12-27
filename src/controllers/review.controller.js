import {
  getReviewsByProduct,
  getAllReviews as getAllReviewsService,
  createReview,
  getAverageRating,
  deleteReview,
  deleteReviewPermanent,
  restaurarReview,
} from "../services/review.service.js";

export const getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await getReviewsByProduct(productId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { includeDeleted } = req.query;
    const reviews = await getAllReviewsService({
      includeDeleted: includeDeleted === "true",
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { productId, user, rating, comment } = req.body;
    if (!productId || !user || !rating || !comment)
      return res.status(400).json({ message: "Campos incompletos" });

    const review = await createReview({ productId, user, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getAverage = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const average = await getAverageRating(productId);
    res.json({ averageRating: average });
  } catch (error) {
    next(error);
  }
};

export const removeReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBy = req.usuario?.usuarioId || null;
    const review = await deleteReview(id, deletedBy);
    if (!review)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada correctamente (soft-delete)" });
  } catch (error) {
    next(error);
  }
};

export const removeReviewPermanent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteReviewPermanent(id);
    if (!result)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada permanentemente" });
  } catch (error) {
    next(error);
  }
};

export const restaurarReviewController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await restaurarReview(id);
    if (!review)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña restaurada correctamente", review });
  } catch (error) {
    next(error);
  }
};
