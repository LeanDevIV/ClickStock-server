import express from "express";
import cors from "cors";
import routes from "./src/routes/indexRoutes.js";
import userRoutes from "./src/routes/usuarioRoutes.js";
import { conexionBD } from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await conexionBD(); 

    app.use(cors());
    app.use(express.json());


    app.use("/usuarios", userRoutes);
    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();
