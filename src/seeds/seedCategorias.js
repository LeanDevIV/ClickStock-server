import mongoose from "mongoose";
import CategoriaModel from "../models/Categoria.js";
import dotenv from "dotenv";
import slugify from "slugify";
import { conexionBD } from "../config/db.js";

dotenv.config();

const categorias = [
  {
    nombre: "Electrónica",
    descripcion: "Dispositivos electrónicos y accesorios",
    imagen: "https://via.placeholder.com/150?text=Electronica",
  },
  {
    nombre: "Ropa",
    descripcion: "Prendas de vestir para hombre, mujer y niños",
    imagen: "https://via.placeholder.com/150?text=Ropa",
  },
  {
    nombre: "Hogar",
    descripcion: "Artículos para el hogar y decoración",
    imagen: "https://via.placeholder.com/150?text=Hogar",
  },
  {
    nombre: "Deportes",
    descripcion: "Equipamiento deportivo y de fitness",
    imagen: "https://via.placeholder.com/150?text=Deportes",
  },
  {
    nombre: "Libros",
    descripcion: "Libros de diferentes géneros y autores",
    imagen: "https://via.placeholder.com/150?text=Libros",
  },
  {
    nombre: "Juguetes",
    descripcion: "Juguetes para niños y coleccionables",
    imagen: "https://via.placeholder.com/150?text=Juguetes",
  },
];

async function runSeed() {
  try {
    await conexionBD();

    // Limpiar colección (opcional)
    await CategoriaModel.deleteMany({});
    console.log("🧹 Colección 'categorías' limpiada");

    // Agregar slugs manualmente
    const categoriasConSlug = categorias.map(cat => ({
      ...cat,
      slug: slugify(cat.nombre, { lower: true, strict: true })
    }));

    const insertResult = await CategoriaModel.insertMany(categoriasConSlug, { ordered: true });
    console.log(`✅ Insertados ${insertResult.length} categorías`);
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión a MongoDB cerrada");
  }
}

runSeed();
