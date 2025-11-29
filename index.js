import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import routes from "./src/routes/indexRoutes.js";
import { conexionBD } from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { checkAndSeedDatabase } from "./src/utils/autoSeed.js";
import helmet from "helmet";
import hpp from "hpp";
import { limiter } from "./src/middleware/rateLimit.js";
import { mongoSanitize } from "./src/middleware/mongoSanitize.js";
import { xssSanitize } from "./src/middleware/xssSanitize.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use("/api", limiter);

const corsOptions = {
    // Permite solo el origen del frontend (Vite/React)
    origin: 'http://localhost:5173', 
    
    // Permite todos los métodos necesarios (PUT, DELETE, POST, etc.)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    
    // Crucial si usas cookies o tokens 
    credentials: true,
    
    // Garantiza que la respuesta preflight (OPTIONS) sea un éxito
    optionsSuccessStatus: 204 
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(fileUpload());

app.use(mongoSanitize());
app.use(xssSanitize());
app.use(hpp());

app.use(express.static(join(__dirname, "public")));
const storagePath = path.join(process.cwd(), "storage");
app.use("/storage", express.static(storagePath));
app.use("/health", (req, res) => {
    res.json({ msg: "Hola, el servidor está funcionando correctamente!" });
});
app.use("/api", routes);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public", "index.html"));
});
app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ message: "Ruta no encontrada" });
    }
    res.sendFile(join(__dirname, "public", "index.html"));
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await conexionBD();
        await checkAndSeedDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
};

startServer();