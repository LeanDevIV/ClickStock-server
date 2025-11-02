import mongoose from "mongoose";

const favoritosEsquema = new mongoose.Schema(
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
        fechaAgregado: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Favoritos", favoritosEsquema);

