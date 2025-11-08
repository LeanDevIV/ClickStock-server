import {
  getReviewsByProduct,
  createReview,
  getAverageRating,
  deleteReview,
} from "../services/review.service.js";

// Obtener todas las reseñas de un producto
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await getReviewsByProduct(productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
};

// Crear una reseña nueva
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

// Obtener promedio de calificación
export const getAverage = async (req, res) => {
  try {
    const { productId } = req.params;
    const average = await getAverageRating(productId);
    res.json({ averageRating: average });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular promedio", error });
  }
};

// Eliminar reseña (opcional, por admin o usuario)
export const removeReview = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteReview(id);
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reseña", error });
  }
};
