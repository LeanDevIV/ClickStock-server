import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      default: "general",
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    imagenes: [
      {
        type: String,
      },
    ],
    disponible: {
      type: Boolean,
      default: true, 
    }
  },
  {
    timestamps: true, 
  }
);


productoSchema.index({ name: "text", category: "text" });

export default mongoose.model("Product", productoSchema);
