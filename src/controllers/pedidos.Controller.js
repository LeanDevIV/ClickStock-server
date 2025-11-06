import pedidoService from "../services/pedido.Service";
const pedidoController = {
  async crearPedido(req, res) {
    try {
      console.log("datos recibidos:", req.body);
      const resultado = await pedidoService.crearPedido(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      console.error(" Error:", error);

      if (
        error.message.includes("Faltan campos") ||
        error.message.includes("Producto no encontrado") ||
        error.message.includes("Stock insuficiente") ||
        error.message.includes("array con al menos")
      ) {
        return res.status(400).json({ error: error.message });
      }

      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  async obtenerPedidos(req, res) {
    try {
      const resultado = await pedidoService.obtenerPedidos();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async obtenerPedido(req, res) {
    try {
      const resultado = await pedidoService.obtenerPedidoPorId(req.params.id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },
  async actualizarPedido(req, res) {
    try {
      const resultado = await pedidoService.actualizarPedido(
        req.params.id,
        req.body
      );
      res.json(resultado);
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },
  async actualizarestado(req, res) {
    try {
      const resultado = await pedidoService.actualizarestado(
        req.params.id,
        req.body.estado
      );
      res.json(resultado);
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes("Estado no válido")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },
  async eliminarPedido(req, res) {
    try {
      const resultado = await pedidoService.eliminarPedido(req.params.id);
      res.json(resultado);
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },
  async obtenerPedidosUsuarios(req, res) {
    try {
      const resultado = await pedidoService.obtenerPedidosPorUsuario(
        req.params.usuarioId
      );
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default pedidoController;
