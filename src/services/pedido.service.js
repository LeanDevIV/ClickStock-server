import Pedido from "../models/Pedido.js";
import Producto from "../models/Productos.js";
const pedidoService = {
  async crearPedido(pedidoData) {
    const { usuario, productos, total, direccion } = pedidoData;
    if (!usuario || !productos || !total || !direccion) {
      throw new Error("Faltan campos requeridos: usuario, productos o total");
    }
    if (direccion.trim() === "") {
      throw new Error("La direccion no puede estar vacia");
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
      direccion: direccion.trim(),
      estado: "pendiente",
    });
    const pedidoGuardado = await nuevoPedido.save();
    for (let item of productos) {
      await Producto.findByIdAndUpdate(item.producto, {
        $inc: { stock: -item.cantidad },
      });
    }
    const pedidoCompleto = await Pedido.findById(pedidoGuardado._id)
      .populate("usuario", "nombre correo")
      .populate("productos.producto", "nombre precio categoria");
    return {
      pedido: pedidoCompleto,
    };
  },
  async obtenerPedidos() {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombre correo")
      .populate("productos.producto", "nombre precio categoria")
      .sort({ fechaCreacion: -1 });
    return { pedidos };
  },
  async obtenerPedidoPorId(id) {
    const pedido = await Pedido.findById(id)
      .populate("usuario", "nombre correo")
      .populate("productos.producto", "nombre precio categoria");
    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }
    return { pedido };
  },
  async actualizarPedido(id, updateData) {
    if (updateData.direccion && updateData.direccion.trim() === "") {
      throw new Error("La dirección no puede estar vacía");
    }
    if (updateData.direccion) {
      updateData.direccion = updateData.direccion.trim();
    }
    const pedidoAnterior = await Pedido.findById(id);
    if (!pedidoAnterior) {
      throw new Error("Pedido no encontrado");
    }
    for (let item of pedidoAnterior.productos) {
      await Producto.findByIdAndUpdate(item.producto, {
        $inc: { stock: item.cantidad },
      });
    }

    if (updateData.productos && Array.isArray(updateData.productos)) {
      for (let item of updateData.productos) {
        const producto = await Producto.findById(item.producto);
        if (!producto) {
          throw new Error(`Producto no encontrado: ${item.producto}`);
        }
        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para: ${producto.nombre}`);
        }

        await Producto.findByIdAndUpdate(item.producto, {
          $inc: { stock: -item.cantidad },
        });
      }
    }
    const pedido = await Pedido.findByIdAndUpdate(id, updateData, { new: true })
      .populate("usuario", "nombre correo")
      .populate("productos.producto", "nombre precio categoria");

    return {
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
      .populate("usuario", "nombre correo")
      .populate("productos.producto", "nombre precio");
    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }
    return {
      pedido,
    };
  },
  async eliminarPedido(id, deletedBy = null) {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }
    for (const item of pedido.productos) {
      const producto = await Producto.findById(item.producto);
      if (producto) {
        producto.stock += item.cantidad;
        await producto.save();
      }
    }

    pedido.isDeleted = true;
    pedido.deletedAt = new Date();
    if (deletedBy) pedido.deletedBy = deletedBy;
    await pedido.save();

    return {
      message:
        "Pedido eliminado correctamente (soft-delete) y stock restablecido",
    };
  },
  async eliminarPedidoPermanent(id) {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      throw new Error("Pedido no encontrado");
    }
    for (const item of pedido.productos) {
      const producto = await Producto.findById(item.producto);
      if (producto) {
        producto.stock += item.cantidad;
        await producto.save();
      }
    }
    await Pedido.findByIdAndDelete(id);
    return { message: "Pedido eliminado permanentemente y stock restablecido" };
  },
  async restaurarPedido(id) {
    const pedido = await Pedido.findById(id);
    if (!pedido) return null;
    pedido.isDeleted = false;
    pedido.deletedBy = null;
    pedido.deletedAt = null;
    await pedido.save();
    return pedido;
  },
  async obtenerPedidosPorUsuario(usuarioId) {
    const pedidos = await Pedido.find({ usuario: usuarioId, isDeleted: false })
      .populate("usuario", "nombre correo")
      .populate("productos.producto", "nombre precio categoria")
      .sort({ fechaCreacion: -1 });
    return { pedidos };
  },
};
export default pedidoService;
