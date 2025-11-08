import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import promocionRoutes from "./routes/promocionRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/promociones", promocionRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB"))
  .catch((err) => console.error(" Error al conectar a MongoDB:", err));

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Servidor corriendo en el puerto ${PORT}`));
