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
    ,
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
    }
  },
  {
    timestamps: true, 
  }
);


EsquemaProducto.index({ nombre: "text", categoria: "text" });

export default mongoose.model("Producto", EsquemaProducto);
