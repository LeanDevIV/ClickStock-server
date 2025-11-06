import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from "./src/routes/indexRoutes.js";
import { conexionBD } from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await conexionBD(); 

    app.use(cors());
    app.use(express.json());
    
    // Servir archivos estáticos desde la carpeta public
    app.use(express.static(join(__dirname, 'public')));
    
    // Rutas de la API
    app.use("/health", (req, res) => {
      res.json({ msg: "Hola, el servidor está funcionando correctamente!" });
    });
    app.use("/api", routes);
    
    // Ruta para servir el index.html en todas las demás rutas
    app.get('/', (req, res) => {
      res.sendFile(join(__dirname, 'public', 'index.html'));
    });
    
    // Manejo de rutas no encontradas
    app.use((req, res) => {
      res.sendFile(join(__dirname, 'public', 'index.html'));
    });
    
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();
