import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    match: [/\S+@\S+\.\S+/, "El email no tiene un formato válido"],
  },
  asunto: {
    type: String,
    required: [true, "El asunto es obligatorio"],
    trim: true,
  },
  mensaje: {
    type: String,
    required: [true, "El mensaje es obligatorio"],
  },
  estado: {
    type: String,
    enum: ["pendiente", "leído", "respondido"],
    default: "pendiente",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Contacto = mongoose.model("Contacto", contactoSchema);

export default Contacto;