import mongoose from "mongoose";

const PromocionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  descuento: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
  ],
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  activa: {
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true, // agrega createdAt y updatedAt automáticamente
});

const Promocion = mongoose.model("Promocion", PromocionSchema);
export default Promocion;