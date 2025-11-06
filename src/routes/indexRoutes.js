import { Router } from "express";

import usuarioRoutes from "./usuarioRoutes.js";
import productosRoutes from "./productosRoutes.js";
import favoritosRoutes from "./favoritosRoutes.js";
import carritoRoutes from "./carritoRoutes.js";
import pedidosRoutes from "./pedidos.routes.js"


const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/productos", productosRoutes);
routes.use("/favoritos", favoritosRoutes);
routes.use("/carrito", carritoRoutes);
routes.use("/pedidos",pedidosRoutes)

export default routes;
