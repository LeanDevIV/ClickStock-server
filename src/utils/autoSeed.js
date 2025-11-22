import mongoose from "mongoose";
import CategoriaModel from "../models/Categoria.js";
import Producto from "../models/Productos.js";
import { UsuarioModel } from "../models/Usuario.js";
import slugify from "slugify";

/**
 * Verifica si la base de datos está vacía
 * @returns {Promise<boolean>} true si está vacía, false si tiene datos
 */
export async function isDatabaseEmpty() {
  try {
    const [categoriasCount, productosCount, usuariosCount] = await Promise.all([
      CategoriaModel.countDocuments(),
      Producto.countDocuments(),
      UsuarioModel.countDocuments(),
    ]);

    return categoriasCount === 0 && productosCount === 0 && usuariosCount === 0;
  } catch (error) {
    console.error("Error al verificar estado de la base de datos:", error);
    return false;
  }
}

/**
 * Datos de seed para categorías
 */
const categoriasData = [
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

/**
 * Datos de seed para usuarios
 */
const usuariosData = [
  {
    nombreUsuario: "admin",
    emailUsuario: "admin@clickstock.com",
    rolUsuario: "admin",
    contrasenia: "admin123",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombreUsuario: "usuario_demo",
    emailUsuario: "usuario@clickstock.com",
    rolUsuario: "usuario",
    contrasenia: "usuario123",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
];

/**
 * Datos de seed para productos
 */
const productosData = [
  {
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico con switches rojos y retroiluminación RGB.",
    precio: 59999,
    categoriaNombre: "electrónica",
    stock: 25,
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
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
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
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
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
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
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
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
    imagenes: ["https://i.imgur.com/9Fb8uon.png"],
    disponible: true,
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
];

/**
 * Ejecuta el auto-seeding de la base de datos
 * @returns {Promise<boolean>} true si se ejecutó exitosamente, false si falló
 */
async function runAutoSeed() {
  try {
    console.log("🌱 Iniciando auto-seeding de la base de datos...");

    // 🔧 Limpiar índices antiguos que puedan causar conflictos
    try {
      console.log("🔧 Verificando índices...");
      const indexes = await UsuarioModel.collection.getIndexes();

      // Si existe un índice 'correo_1' (antiguo), eliminarlo
      if (indexes.correo_1) {
        console.log("🗑️  Eliminando índice antiguo 'correo_1'...");
        await UsuarioModel.collection.dropIndex("correo_1");
        console.log("✅ Índice antiguo eliminado");
      }
    } catch (indexError) {
      console.log("ℹ️  No se encontraron índices antiguos para limpiar");
    }

    // 1. Seed Categorías
    console.log("📁 Poblando categorías...");
    const categoriasConSlug = categoriasData.map((cat) => ({
      ...cat,
      slug: slugify(cat.nombre, { lower: true, strict: true }),
    }));

    const categoriasInsertadas = await CategoriaModel.insertMany(
      categoriasConSlug,
      {
        ordered: true,
      }
    );
    console.log(`✅ ${categoriasInsertadas.length} categorías creadas`);

    // 2. Seed Usuarios
    console.log("👥 Poblando usuarios...");

    try {
      const usuariosInsertados = await UsuarioModel.insertMany(usuariosData, {
        ordered: false, // Continuar aunque falle uno
      });
      console.log(`✅ ${usuariosInsertados.length} usuarios creados`);
    } catch (userError) {
      // Si falla por duplicados, intentar insertar uno por uno
      console.log(
        "⚠️  Algunos usuarios ya existen, insertando individualmente..."
      );
      let insertedCount = 0;

      for (const userData of usuariosData) {
        try {
          await UsuarioModel.create(userData);
          insertedCount++;
        } catch (err) {
          if (err.code === 11000) {
            console.log(
              `ℹ️  Usuario ${userData.emailUsuario} ya existe, omitiendo...`
            );
          } else {
            throw err;
          }
        }
      }

      console.log(`✅ ${insertedCount} usuarios nuevos creados`);
    }

    // 3. Seed Productos
    console.log("📦 Poblando productos...");

    // Obtener IDs de las categorías
    const categorias = await CategoriaModel.find({}, "_id nombre");
    const categoriasMap = {};
    categorias.forEach((cat) => {
      categoriasMap[cat.nombre.toLowerCase()] = cat._id;
    });

    // Mapear productos con los IDs correctos de categorías
    const productosConCategoria = productosData.map((prod) => ({
      ...prod,
      categoria: categoriasMap[prod.categoriaNombre] || null,
      categoriaNombre: undefined, // Remover el campo temporal
    }));

    const productosInsertados = await Producto.insertMany(
      productosConCategoria,
      {
        ordered: true,
      }
    );
    console.log(`✅ ${productosInsertados.length} productos creados`);

    console.log("🎉 Auto-seeding completado exitosamente");
    console.log("📊 Datos de demostración listos para usar");
    console.log("👤 Usuario admin: admin@clickstock.com / admin123");
    console.log("👤 Usuario demo: usuario@clickstock.com / usuario123");

    return true;
  } catch (error) {
    console.error("❌ Error durante el auto-seeding:", error.message);
    console.error(
      "💡 Tip: Verifica que la base de datos esté completamente vacía o ejecuta los seeds manualmente"
    );
    return false;
  }
}

/**
 * Ejecuta el auto-seeding de la base de datos
 * Solo se ejecuta si AUTO_SEED está habilitado en las variables de entorno
 */
export async function checkAndSeedDatabase() {
  try {
    // Verificar si el auto-seeding está habilitado
    const autoSeedEnabled = process.env.AUTO_SEED === "true";

    if (!autoSeedEnabled) {
      console.log("ℹ️  Auto-seeding deshabilitado (AUTO_SEED=false)");
      return;
    }

    // Verificar si la base de datos está vacía
    const isEmpty = await isDatabaseEmpty();

    if (isEmpty) {
      console.log("📭 Base de datos vacía detectada");
      await runAutoSeed();
    } else {
      console.log("✅ Base de datos ya contiene datos, omitiendo auto-seeding");
    }
  } catch (error) {
    console.error("❌ Error en checkAndSeedDatabase:", error);
  }
}
