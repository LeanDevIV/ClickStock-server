import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

// Solo cargar .env en desarrollo local, no en producción (Vercel)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const crearPreferencia = async (productos, urlRetorno, usuario = {}) => {
  const cliente = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const items = productos.map((prod) => ({
    title: prod.title,
    quantity: Number(prod.quantity || prod.cantidad || 1),
    unit_price: Number(prod.unit_price || prod.precio || prod.price || 0),
    currency_id: "ARS",
  }));

  const preference = new Preference(cliente);

if (!urlRetorno || !urlRetorno.startsWith("http")) {
  throw new Error("urlRetorno inválida: Mercado Pago requiere una URL pública HTTPS");
}

const baseUrl = urlRetorno.replace(/\/$/, ""); 
  const result = await preference.create({
    body: {
      items,
      external_reference: String(usuario.pedidoId || ""),
      notification_url: process.env.MP_WEBHOOK_URL,
      back_urls: {
        success: `${baseUrl}/payments/success`,
        failure: `${baseUrl}/payments/failure`,
        pending: `${baseUrl}/payments/pending`,
      },
      auto_return: "approved",
    },
  });

  return {
    id: result.id,
    init_point: result.init_point,
    statusCode: 200,
  };
};
