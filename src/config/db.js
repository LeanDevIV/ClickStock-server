import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;


export const conexionBD = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("✅ Conexión con base de datos exitosa");
    } catch (error) {
      console.error("❌ Fallo al conectar con base de datos:", error);
      process.exit(1);
    }
  
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Base de datos desconectada");
    });
  
    mongoose.connection.on("reconnected", () => {
      console.log("🔄 Base de datos reconectada");
    });
  };