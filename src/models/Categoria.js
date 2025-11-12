import mongoose from "mongoose";
import slugify from "slugify";
const EsquemaCategoria = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede superar los 50 caracteres"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
      maxlength: [200, "La descripción no puede superar los 200 caracteres"],
    },
    imagen: {
      type: String,
      default: "",
    },
    activa: {
      type: Boolean,
      default: true,
    },
    orden: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

/**Genera el slug automáticamente a partir del nombre */
EsquemaCategoria.pre("save", function (next) {
  if (this.isModified("nombre")) {
    this.slug = slugify(this.nombre, { lower: true, strict: true });
  }
  next();
});
/**Crea el slug antes de actualizar */
EsquemaCategoria.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.nombre) {
    update.slug = slugify(update.nombre, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});
export default mongoose.model("Categoria", EsquemaCategoria);
