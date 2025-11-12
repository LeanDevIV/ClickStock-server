import mongoose from "mongoose";

const EsquemaProducto = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      default: null,
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


EsquemaProducto.index({ nombre: "text", categoria: "text" });

export default mongoose.model("Producto", EsquemaProducto);
