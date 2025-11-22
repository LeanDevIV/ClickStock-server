import mongoose from "mongoose";
import { UsuarioModel } from "./src/models/Usuario.js";
import { conexionBD } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Script para limpiar índices antiguos de la base de datos
 * Ejecutar si hay errores de índices duplicados
 */
async function cleanOldIndexes() {
  try {
    await conexionBD();
    console.log("🔧 Limpiando índices antiguos...");

    // Limpiar índices de Usuario
    try {
      const indexes = await UsuarioModel.collection.getIndexes();
      console.log("📋 Índices actuales en usuarios:", Object.keys(indexes));

      // Si existe el índice antiguo 'correo_1', eliminarlo
      if (indexes.correo_1) {
        console.log("🗑️  Eliminando índice antiguo 'correo_1'...");
        await UsuarioModel.collection.dropIndex("correo_1");
        console.log("✅ Índice 'correo_1' eliminado");
      } else {
        console.log("ℹ️  No se encontró el índice 'correo_1'");
      }

      // Mostrar índices finales
      const finalIndexes = await UsuarioModel.collection.getIndexes();
      console.log("📋 Índices finales:", Object.keys(finalIndexes));
    } catch (error) {
      console.error("❌ Error al limpiar índices:", error.message);
    }

    console.log("✅ Limpieza completada");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión cerrada");
  }
}

cleanOldIndexes();
