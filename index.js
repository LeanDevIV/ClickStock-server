import express from "express";
import cors from "cors";
import routes from "./src/routes/indexRoutes.js";
import { conexionBD } from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await conexionBD(); 

    app.use(cors());
    app.use(express.json());
    
    app.use("/api", routes);
    
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();
