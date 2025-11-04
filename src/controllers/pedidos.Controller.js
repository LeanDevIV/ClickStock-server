import Pedido from "../models/pedidos.model.js"; 
import Producto from "../models/Productos.js";  
const pedidoController = {
  async crearPedido(req, res) {
    try {
      console.log(" Datos recibidos para nuevo pedido:", req.body);
      
      const { usuario, productos, total } = req.body;
      if (!usuario || !productos || !total) {
        return res.status(400).json({ 
          error: "Faltan campos requeridos: usuario, productos o total" 
        });
      }

      if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({
          error: "El campo productos debe ser un array con al menos un producto",
        });
      }
      for (let item of productos) {
        const productoEncontrado = await Producto.findById(item.producto); 
        if (!productoEncontrado) {
          return res.status(404).json({ 
            error: `Producto no encontrado: ${item.producto}`  
          });
        }

        if (productoEncontrado.stock < item.cantidad) {
          return res.status(400).json({
            error: `Stock insuficiente para: ${productoEncontrado.nombre}. Stock actual: ${productoEncontrado.stock}`,
          });
        }
      }

      const nuevoPedido = new Pedido({  
        usuario,
        productos, 
        total,
        estado: "pendiente",
      });

      const pedidoGuardado = await nuevoPedido.save();
      console.log("Pedido creado exitosamente:", pedidoGuardado._id);


      for (let item of productos) {
        await Producto.findByIdAndUpdate(item.producto, {
          $inc: { stock: -item.cantidad },
        });
      }

      const pedidoCompleto = await Pedido.findById(pedidoGuardado._id)  
        .populate("usuario", "nombreUsuario emailUsuario")
        .populate("productos.producto", "nombre precio categoria");

      res.status(201).json({
        message: "Pedido creado exitosamente",
        pedido: pedidoCompleto,
      });

    } catch (error) {
      console.error(" Error al crear pedido:", error);
      res.status(500).json({
        error: "Error interno del servidor al crear el pedido",
        detalle: error.message,
      });
    }
  },
};

export default pedidoController;