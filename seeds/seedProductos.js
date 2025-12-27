import dotenv from "dotenv";
import mongoose from "mongoose";
import { conexionBD } from "../src/config/db.js";
import Producto from "../src/models/Productos.js";
import CategoriaModel from "../src/models/Categoria.js";

dotenv.config();

const productosRaw = [
  {
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico con switches rojos y retroiluminación RGB.",
    precio: 59999,
    categoriaNombre: "electrónica",
    stock: 25,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Mouse Gamer 7200 DPI",
    descripcion: "Mouse ergonómico con 7 botones programables.",
    precio: 25999,
    categoriaNombre: "electrónica",
    stock: 40,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Monitor 24'' 144Hz",
    descripcion: "Monitor Full HD con tasa de refresco de 144Hz.",
    precio: 189999,
    categoriaNombre: "electrónica",
    stock: 12,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Auriculares Inalámbricos",
    descripcion: "Auriculares Bluetooth con micrófono y cancelación de ruido.",
    precio: 42999,
    categoriaNombre: "electrónica",
    stock: 30,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Silla Gamer",
    descripcion: "Silla ergonómica con soporte lumbar y reclinación.",
    precio: 239999,
    categoriaNombre: "hogar",
    stock: 8,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },

  {
    nombre: "Webcam Full HD 1080p",
    descripcion:
      "Cámara web con enfoque automático y micrófono estéreo integrado.",
    precio: 35000,
    categoriaNombre: "electrónica",
    stock: 50,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Micrófono Condenser USB",
    descripcion: "Ideal para streaming y podcast, incluye trípode.",
    precio: 45999,
    categoriaNombre: "electrónica",
    stock: 15,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Escritorio Elevable Eléctrico",
    descripcion: "Escritorio standing desk con memoria de altura.",
    precio: 450000,
    categoriaNombre: "hogar",
    stock: 5,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Mousepad XXL Mapa Mundi",
    descripcion: "Superficie de tela speed, 90x40cm, bordes cosidos.",
    precio: 12000,
    categoriaNombre: "electrónica",
    stock: 100,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Soporte Brazo para Monitor",
    descripcion: "Brazo hidráulico para monitores de 17 a 32 pulgadas.",
    precio: 32000,
    categoriaNombre: "electrónica",
    stock: 20,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Lámpara de Escritorio LED",
    descripcion: "Lámpara articulada con control táctil y 3 tonos de luz.",
    precio: 18500,
    categoriaNombre: "hogar",
    stock: 35,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Disco SSD NVMe 1TB",
    descripcion: "Almacenamiento ultra rápido Gen 4, lectura 5000MB/s.",
    precio: 110000,
    categoriaNombre: "electrónica",
    stock: 45,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Memoria RAM 16GB DDR4",
    descripcion: "Módulo de 3200MHz con disipador de calor.",
    precio: 42000,
    categoriaNombre: "electrónica",
    stock: 60,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Gabinete Gamer Vidrio Templado",
    descripcion: "Torre media con 4 coolers RGB incluidos y filtro de polvo.",
    precio: 85000,
    categoriaNombre: "electrónica",
    stock: 10,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Fuente de Poder 750W 80+ Gold",
    descripcion: "Fuente modular certificada para alto rendimiento.",
    precio: 95000,
    categoriaNombre: "electrónica",
    stock: 18,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Router Wi-Fi 6 AX3000",
    descripcion: "Router de doble banda con tecnología mesh.",
    precio: 78000,
    categoriaNombre: "electrónica",
    stock: 22,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Tablet Gráfica 10 Pulgadas",
    descripcion: "Para dibujo digital y diseño, incluye lápiz sin batería.",
    precio: 55000,
    categoriaNombre: "electrónica",
    stock: 28,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Parlantes 2.1 con Subwoofer",
    descripcion: "Sistema de sonido envolvente para PC y TV.",
    precio: 62000,
    categoriaNombre: "electrónica",
    stock: 14,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Notebook Stand de Aluminio",
    descripcion: "Soporte plegable y ventilado para laptops.",
    precio: 15000,
    categoriaNombre: "electrónica",
    stock: 80,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Cable HDMI 2.1 8K",
    descripcion: "Cable trenzado de alta velocidad, 2 metros.",
    precio: 8500,
    categoriaNombre: "electrónica",
    stock: 150,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Hub USB-C 7 en 1",
    descripcion: "Expansión de puertos: HDMI, USB 3.0, SD Card.",
    precio: 29000,
    categoriaNombre: "electrónica",
    stock: 40,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Tira LED RGB 5 Metros",
    descripcion: "Iluminación inteligente compatible con Alexa y Google.",
    precio: 19500,
    categoriaNombre: "hogar",
    stock: 55,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Estabilizador de Tensión",
    descripcion: "Protección para PC con 6 tomas y fusibles.",
    precio: 22000,
    categoriaNombre: "hogar",
    stock: 30,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Kit de Limpieza para Pantallas",
    descripcion: "Spray anti-estático y paño de microfibra.",
    precio: 4500,
    categoriaNombre: "hogar",
    stock: 200,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
  {
    nombre: "Joystick Inalámbrico PC/Consola",
    descripcion: "Mando con vibración y batería recargable.",
    precio: 38000,
    categoriaNombre: "electrónica",
    stock: 25,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
  },
];

async function runSeed() {
  try {
    await conexionBD();

    await Producto.deleteMany({});
    console.log("🧹 Colección 'productos' limpiada");

    const categorias = await CategoriaModel.find({}, "_id nombre");

    if (categorias.length === 0) {
      throw new Error(
        "¡Che, no hay categorías en la base de datos! Corré el seeder de categorías primero."
      );
    }

    const categoriasMap = {};
    categorias.forEach((cat) => {
      categoriasMap[cat.nombre.toLowerCase()] = cat._id;
    });

    console.log("Categorías encontradas:", Object.keys(categoriasMap));

    const productosParaInsertar = productosRaw.map((prod) => {
      const catId = categoriasMap[prod.categoriaNombre.toLowerCase()];

      if (!catId) {
        console.warn(
          `⚠️ Ojo: No encontré ID para la categoría '${prod.categoriaNombre}' del producto '${prod.nombre}'. Se pondrá null.`
        );
      }

      return {
        ...prod,
        categoria: catId || null,
        categoriaNombre: undefined,
        isDeleted: false,
        deletedBy: null,
        deletedAt: null,
      };
    });

    const insertResult = await Producto.insertMany(productosParaInsertar, {
      ordered: true,
    });

    console.log(
      `✅ Insertados ${insertResult.length} productos correctamente.`
    );
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión a MongoDB cerrada");
    process.exit(0); // Forzamos el cierre limpio
  }
}

runSeed();
