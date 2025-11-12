import Review from "../models/Review.js";

export const getReviewsByProduct = async (productId) => {
  return await Review.find({ productId, isDeleted: false }).sort({ createdAt: -1 });
};

export const createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

export const getAverageRating = async (productId) => {
  const reviews = await Review.find({ productId, isDeleted: false });
  if (reviews.length === 0) return 0;
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  return Number(avg.toFixed(1));
};

export const deleteReview = async (id, deletedBy = null) => {
  const review = await Review.findById(id);
  if (!review) return null;
  review.isDeleted = true;
  review.deletedAt = new Date();
  if (deletedBy) review.deletedBy = deletedBy;
  await review.save();
  return review;
};

export const deleteReviewPermanent = async (id) => {
  return await Review.findByIdAndDelete(id);
};

export const restaurarReview = async (id) => {
  const review = await Review.findById(id);
  if (!review) return null;
  review.isDeleted = false;
  review.deletedBy = null;
  review.deletedAt = null;
  await review.save();
  return review;
};
