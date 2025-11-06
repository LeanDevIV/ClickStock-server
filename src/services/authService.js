import Pedido from "../models/pedidos.model.js";
import Producto from "../models/Productos.js";

const pedidoService = {
  async crearPedido(pedidoData) {
    const { usuario, productos, total } = pedidoData;

    if (!usuario || !productos || !total) {
      throw new Error("Faltan campos requeridos: usuario, productos o total");
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error(
        "El campo productos debe ser un array con al menos un producto"
      );
    }

    for (let item of productos) {
      const productoEncontrado = await Producto.findById(item.producto);

      if (!productoEncontrado) {
        throw new Error(`Producto no encontrado: ${item.producto}`);
      }

      if (productoEncontrado.stock < item.cantidad) {
        throw new Error(
          `Stock insuficiente para: ${productoEncontrado.nombre}. Stock actual: ${productoEncontrado.stock}`
        );
      }
    }

    const nuevoPedido = new Pedido({
      usuario,
      productos,
      total,
      estado: "pendiente",
    });

    const pedidoGuardado = await nuevoPedido.save();

    for (let item of productos) {
      await Producto.findByIdAndUpdate(item.producto, {
        $inc: { stock: -item.cantidad },
      });
    }

    const pedidoCompleto = await Pedido.findById(pedidoGuardado._id)
      .populate("usuario", "nombreUsuario emailUsuario")
      .populate("productos.producto", "nombre precio categoria");

    return {
      message: "Pedido creado exitosamente",
      pedido: pedidoCompleto,
    };
  },

  async obtenerPedidos() {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombreUsuario emailUsuario")
      .populate("productos.producto", "nombre precio categoria")
      .sort({ fechaCreacion: -1 });

    return { pedidos };
  },

  async obtenerPedidoPorId(id) {
    const pedido = await Pedido.findById(id)
      .populate("usuario", "nombreUsuario emailUsuario")
      .populate("productos.producto", "nombre precio categoria");

    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }

    return { pedido };
  },

  async actualizarPedido(id, updateData) {
    const pedido = await Pedido.findByIdAndUpdate(id, updateData, { new: true })
      .populate("usuario", "nombreUsuario emailUsuario")
      .populate("productos.producto", "nombre precio categoria");

    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }

    return {
      message: "Pedido actualizado correctamente",
      pedido,
    };
  },

  async actualizarEstado(id, nuevoEstado) {
    const estadosPermitidos = [
      "pendiente",
      "procesando",
      "enviado",
      "entregado",
      "cancelado",
    ];

    if (!estadosPermitidos.includes(nuevoEstado)) {
      throw new Error(
        `Estado no válido. Estados permitidos: ${estadosPermitidos.join(", ")}`
      );
    }

    const pedido = await Pedido.findByIdAndUpdate(
      id,
      { estado: nuevoEstado },
      { new: true }
    )
      .populate("usuario", "nombreUsuario emailUsuario")
      .populate("productos.producto", "nombre precio");

    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }

    return {
      message: `Estado del pedido actualizado a: ${nuevoEstado}`,
      pedido,
    };
  },

  async eliminarPedido(id) {
    const pedido = await Pedido.findByIdAndDelete(id);

    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }

    return {
      message: "Pedido eliminado correctamente",
      pedidoEliminado: pedido,
    };
  },

  async obtenerPedidosPorUsuario(usuarioId) {
    const pedidos = await Pedido.find({ usuario: usuarioId })
      .populate("productos.producto", "nombre precio categoria")
      .sort({ fechaCreacion: -1 });

    return { pedidos };
  },
};

export default pedidoService;
