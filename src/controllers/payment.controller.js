import { MercadoPagoConfig, Payment } from "mercadopago";
import * as paymentService from "../services/payment.service.js";
import Pedido from "../models/Pedido.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const crearPreferencia = async (req, res) => {
  try {
    const { productos, usuario } = req.body;
    const urlRetorno =
      req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";
    const preferencia = await paymentService.crearPreferencia(
      productos,
      urlRetorno,
      usuario
    );

    return res.json({ id: preferencia.id, init_point: preferencia.init_point });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;

    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];

      if (!paymentId) {
        return res.sendStatus(400);
      }

      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });

      console.log("Webhook recibido. Estado del pago:", paymentData.status);

      if (paymentData.status === "approved") {
        const pedidoId = paymentData.external_reference;

        if (pedidoId) {
          console.log(
            `Pago aprobado para pedido ${pedidoId}. Actualizando estado...`
          );

          const pedidoActualizado = await Pedido.findByIdAndUpdate(
            pedidoId,
            { estado: "pagado" }, // O el estado que corresponda en tu lógica de negocio
            { new: true }
          );

          if (pedidoActualizado) {
            console.log(
              "Pedido actualizado correctamente:",
              pedidoActualizado._id
            );
          } else {
            console.error("No se encontró el pedido con ID:", pedidoId);
          }
        } else {
          console.warn("Pago aprobado sin external_reference (pedidoId)");
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en webhook:", error);
    res.sendStatus(500);
  }
};
