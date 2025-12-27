import pedidoService from "../services/pedido.service.js";
const pedidoController = {
  async crearPedido(req, res, next) {
    try {
      const resultado = await pedidoService.crearPedido(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      next(error);
    }
  },
  async obtenerPedidos(req, res, next) {
    try {
      const resultado = await pedidoService.obtenerPedidos();
      res.json(resultado.pedidos);
    } catch (error) {
      next(error);
    }
  },
  async obtenerPedido(req, res, next) {
    try {
      const resultado = await pedidoService.obtenerPedidoPorId(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  },
  async actualizarPedido(req, res, next) {
    try {
      const resultado = await pedidoService.actualizarPedido(
        req.params.id,
        req.body
      );
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  },
  async actualizarEstado(req, res, next) {
    try {
      const resultado = await pedidoService.actualizarEstado(
        req.params.id,
        req.body.estado
      );
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  },
  async eliminarPedido(req, res, next) {
    try {
      const deletedBy = req.usuario?.usuarioId || null;

      const resultado = await pedidoService.eliminarPedido(
        req.params.id,
        deletedBy
      );
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  },
  async eliminarPedidoPermanente(req, res, next) {
    try {
      const resultado = await pedidoService.eliminarPedidoPermanent(
        req.params.id
      );
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  },
  async obtenerPedidosUsuario(req, res, next) {
    try {
      const usuarioId = req.usuario.usuarioId;

      const resultado = await pedidoService.obtenerPedidosPorUsuario(usuarioId);

      res.json(resultado.pedidos);
    } catch (error) {
      next(error);
    }
  },

  async restaurarPedido(req, res, next) {
    try {
      const resultado = await pedidoService.restaurarPedido(req.params.id);
      if (!resultado)
        return res.status(404).json({ error: "Pedido no encontrado" });
      res.json({
        message: "Pedido restaurado correctamente",
        pedido: resultado,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default pedidoController;
