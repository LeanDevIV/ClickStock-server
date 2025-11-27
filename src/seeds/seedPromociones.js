import mongoose from "mongoose";
import Promocion from "../models/Promocion.js";
import Producto from "../models/Productos.js";

const seedPromociones = async () => {
  try {
    // Verificar si ya existen promociones
    const count = await Promocion.countDocuments();
    if (count > 0) {
      console.log("Ya existen promociones en la base de datos.");
      return;
    }

    // Obtener algunos productos para asociar
    const productos = await Producto.find().limit(5);
    const productoIds = productos.map((p) => p._id);

    if (productoIds.length === 0) {
      console.log("No hay productos para crear promociones.");
      return;
    }

    const promociones = [
      {
        titulo: "Descuento de Verano",
        descripcion: "Aprovecha los mejores precios para este verano.",
        descuento: 20,
        productos: [productoIds[0], productoIds[1]],
        fechaInicio: new Date(),
        fechaFin: new Date(new Date().setDate(new Date().getDate() + 30)),
        activa: true,
      },
      {
        titulo: "Liquidación Total",
        descripcion: "Todo debe irse, descuentos increíbles.",
        descuento: 50,
        productos: [productoIds[2]],
        fechaInicio: new Date(),
        fechaFin: new Date(new Date().setDate(new Date().getDate() + 7)),
        activa: true,
      },
      {
        titulo: "Promo Lanzamiento",
        descripcion: "Nuevos productos con descuento especial.",
        descuento: 10,
        productos: [productoIds[3], productoIds[4]],
        fechaInicio: new Date(),
        fechaFin: new Date(new Date().setDate(new Date().getDate() + 15)),
        activa: false,
      },
    ];

    await Promocion.insertMany(promociones);
    console.log("Promociones insertadas correctamente.");
  } catch (error) {
    console.error("Error al insertar promociones:", error);
  }
};

export default seedPromociones;
