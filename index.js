import express from "express";
import cors from "cors";
import routes from "./src/routes/indexRoutes.js";
import { conexionBD } from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

await conexionBD();

app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
