import { MercadoPagoConfig, Payment } from "mercadopago";
import * as paymentService from "../services/payment.service.js";
import Pedido from "../models/Pedido.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const crearPreferencia = async (req, res) => {
  try {
    const { productos, usuario } = req.body;
    const urlRetorno = process.env.FRONTEND_URL;

    if (!urlRetorno) {
      return res.status(500).json({
        error: "Configuración del servidor incompleta",
        message: "FRONTEND_URL no está configurado",
      });
    }

    const preferencia = await paymentService.crearPreferencia(
      productos,
      urlRetorno,
      usuario
    );

    return res.json({ id: preferencia.id, init_point: preferencia.init_point });
  } catch (error) {
    return res.status(500).json({
      error: "Error creando preferencia",
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
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
            { estado: "pagado" },
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
