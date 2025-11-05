import mongoose from "mongoose";

const carritoEsquema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
      unique: true,
    },
    productos: [
      {
        idProducto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Carrito", carritoEsquema);
