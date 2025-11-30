import mongoose from "mongoose";

const onlyValidCharsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,!?\s-]+$/;
const noEmojiRegex = /^[^\p{Emoji}]+$/u;
const noRepetitionsRegex = /(.)\1{3,}/;

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: [true, "El producto es obligatorio"],
  },
  user: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "Mínimo 3 caracteres"],
    maxlength: [25, "Máximo 25 caracteres"],
    trim: true,
    validate: [
      { validator: v => onlyValidCharsRegex.test(v), message: "Caracteres inválidos" },
      { validator: v => noEmojiRegex.test(v), message: "No se permiten emojis" },
      { validator: v => !noRepetitionsRegex.test(v), message: "No repitas caracteres más de 3 veces" },
    ]
  },
  rating: {
    type: Number,
    min: [1, "El mínimo es 1"],
    max: [5, "El máximo es 5"],
    required: true
  },
  comment: {
    type: String,
    required: [true, "El comentario es obligatorio"],
    minlength: [10, "Debe tener mínimo 10 caracteres"],
    maxlength: [300, "Máximo 300 caracteres"],
    trim: true,
    validate: [
      { validator: v => onlyValidCharsRegex.test(v), message: "Caracteres inválidos" },
      { validator: v => noEmojiRegex.test(v), message: "No se permiten emojis" },
      { validator: v => !noRepetitionsRegex.test(v), message: "No repitas caracteres más de 3 veces" },
    ]
  },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    default: null,
  },
  deletedAt: { type: Date, default: null },
});

export default mongoose.model("Review", reviewSchema);
