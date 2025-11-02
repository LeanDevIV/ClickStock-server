import { Router } from "express";

import usuarioRoutes from "./usuarioRoutes.js";
import productosRoutes from "./productosRoutes.js";
import carritoRoutes from "./carritoRoutes.js";

const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/productos", productosRoutes);
routes.use("/carrito", carritoRoutes);

export default routes;
