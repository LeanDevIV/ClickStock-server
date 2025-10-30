import { Router } from "express";

//import userRoutes from "./userRoutes.js";
import productosRoutes from "./productosRoutes.js";

const routes = Router();

//routes.use("/users", userRoutes);
routes.use("/productos", productosRoutes);

export default routes;
