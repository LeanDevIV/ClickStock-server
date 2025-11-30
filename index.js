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

const allowedOrigins = [
  "http://localhost:5173",
  "https://clickstock-beta.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
} else {
  conexionBD();
}

export default app;
