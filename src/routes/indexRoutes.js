import { Router } from "express";

import usuarioRoutes from "./usuarioRoutes.js";
import productosRoutes from "./productosRoutes.js";

const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/productos", productosRoutes);

export default routes;
