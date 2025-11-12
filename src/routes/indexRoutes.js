import { Router } from "express";

import usuarioRoutes from "./usuario.routes.js";
import productosRoutes from "./productos.routes.js";
import favoritosRoutes from "./favoritos.routes.js";
import carritoRoutes from "./carrito.routes.js";
import pedidosRoutes from "./pedidos.routes.js";
import uploadsRoutes from "./uploads.routes.js";
import contactoRoutes from "./contacto.routes.js";
import categoriasRoutes from "./categorias.routes.js";

const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/productos", productosRoutes);
routes.use("/categorias", categoriasRoutes);
routes.use("/favoritos", favoritosRoutes);
routes.use("/carrito", carritoRoutes);
routes.use("/pedidos", pedidosRoutes);
routes.use("/uploads", uploadsRoutes);
routes.use("/contacto", contactoRoutes);

export default routes;
