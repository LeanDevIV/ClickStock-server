import Review from "../models/Review.js";

export const getReviewsByProduct = async (productId) => {
  return await Review.find({ productId }).sort({ createdAt: -1 });
};

export const createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

export const getAverageRating = async (productId) => {
  const reviews = await Review.find({ productId });
  if (reviews.length === 0) return 0;
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  return Number(avg.toFixed(1));
};

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};
