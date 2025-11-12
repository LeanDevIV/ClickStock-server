import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  user: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Review", reviewSchema);
