import { Router } from "express";

import usuarioRoutes from "./usuarioRoutes.js";
import productosRoutes from "./productosRoutes.js";
import favoritosRoutes from "./favoritosRoutes.js";

const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/productos", productosRoutes);
routes.use("/favoritos", favoritosRoutes);

export default routes;
