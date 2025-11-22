import dotenv from "dotenv";
import mongoose from "mongoose";
import { conexionBD } from "../config/db.js";
import Producto from "../models/Productos.js";
import CategoriaModel from "../models/Categoria.js";

dotenv.config();

const productos = [
  {
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico con switches rojos y retroiluminación RGB.",
    precio: 59999,
    categoriaNombre: "electrónica",
    stock: 25,
    imagenes: ["https://via.placeholder.com/600x400?text=Teclado+Mecanico+RGB"],
    disponible: true,
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Mouse Gamer 7200 DPI",
    descripcion: "Mouse ergonómico con 7 botones programables.",
    precio: 25999,
    categoriaNombre: "electrónica",
    stock: 40,
    imagenes: ["https://via.placeholder.com/600x400?text=Mouse+Gamer+7200+DPI"],
    disponible: true,
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Monitor 24'' 144Hz",
    descripcion: "Monitor Full HD con tasa de refresco de 144Hz.",
    precio: 189999,
    categoriaNombre: "electrónica",
    stock: 12,
    imagenes: ["https://via.placeholder.com/600x400?text=Monitor+24+144Hz"],
    disponible: true,
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Auriculares Inalámbricos",
    descripcion: "Auriculares Bluetooth con micrófono y cancelación de ruido.",
    precio: 42999,
    categoriaNombre: "electrónica",
    stock: 30,
    imagenes: [
      "https://via.placeholder.com/600x400?text=Auriculares+Bluetooth",
    ],
    disponible: true,
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Silla Gamer",
    descripcion: "Silla ergonómica con soporte lumbar y reclinación.",
    precio: 239999,
    categoriaNombre: "hogar",
    stock: 8,
    imagenes: ["https://via.placeholder.com/600x400?text=Silla+Gamer"],
    disponible: true,
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
];

async function runSeed() {
  try {
    await conexionBD();

    // Limpiar colección (opcional)
    await Producto.deleteMany({});
    console.log("🧹 Colección 'productos' limpiada");

    const insertResult = await Producto.insertMany(productos, {
      ordered: true,
    });
    // Obtener IDs de las categorías
    const categorias = await CategoriaModel.find({}, "_id nombre");
    const categoriasMap = {};
    categorias.forEach(cat => {
      categoriasMap[cat.nombre] = cat._id;
    });

    // Mapear productos con los IDs correctos de categorías
    const productosConCategoria = productos.map(prod => ({
      ...prod,
      categoria: categoriasMap[prod.categoriaNombre] || null,
      categoriaNombre: undefined, // Remover el campo temporal
    }));

    console.log(`✅ Insertados ${insertResult.length} productos`);
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión a MongoDB cerrada");
  }
}

runSeed();
