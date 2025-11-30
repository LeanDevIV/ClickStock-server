import {
  getReviewsByProduct,
  getAllReviews as getAllReviewsService,
  createReview,
  getAverageRating,
  deleteReview,
  deleteReviewPermanent,
  restaurarReview,
} from "../services/review.service.js";

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await getReviewsByProduct(productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { includeDeleted } = req.query;
    const reviews = await getAllReviewsService({
      includeDeleted: includeDeleted === "true",
    });
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener todas las reseñas", error });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId, user, rating, comment } = req.body;
    if (!productId || !user || !rating || !comment)
      return res.status(400).json({ message: "Campos incompletos" });

    const review = await createReview({ productId, user, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error al crear reseña", error });
  }
};

export const getAverage = async (req, res) => {
  try {
    const { productId } = req.params;
    const average = await getAverageRating(productId);
    res.json({ averageRating: average });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular promedio", error });
  }
};

export const removeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBy = req.usuario?.usuarioId || null;
    const review = await deleteReview(id, deletedBy);
    if (!review)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada correctamente (soft-delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reseña", error });
  }
};

export const removeReviewPermanent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteReviewPermanent(id);
    if (!result)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña eliminada permanentemente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar reseña permanentemente", error });
  }
};

export const restaurarReviewController = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await restaurarReview(id);
    if (!review)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json({ message: "Reseña restaurada correctamente", review });
  } catch (error) {
    res.status(500).json({ message: "Error al restaurar reseña", error });
  }
};
