import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const crearPreferencia = async (productos, urlRetorno, usuario = {}) => {
  try {
    if (!process.env.MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN no está configurado");
    }

    const cliente = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
      options: {
        timeout: 10000,
      },
    });

    if (!productos || productos.length === 0) {
      throw new Error("No se proporcionaron productos");
    }

    const items = productos.map((prod, index) => {
      if (!prod.title || !prod.title.trim()) {
        throw new Error(`Producto ${index}: falta el título`);
      }

      const cantidad = Number(prod.quantity || prod.cantidad || 1);
      const precio = Number(prod.unit_price || prod.precio || prod.price || 0);

      if (precio <= 0) {
        throw new Error(
          `Producto ${index} (${prod.title}): precio inválido (${precio})`
        );
      }

      return {
        title: prod.title.trim(),
        quantity: cantidad,
        unit_price: precio,
        currency_id: "ARS",
      };
    });

    if (!urlRetorno || !urlRetorno.startsWith("http")) {
      throw new Error(
        "urlRetorno inválida: Mercado Pago requiere una URL pública"
      );
    }

    const baseUrl = urlRetorno.replace(/\/$/, "");
    const preference = new Preference(cliente);

    const preferenceData = {
      items,
      external_reference: String(usuario.pedidoId || ""),
    };
    const isProduction = urlRetorno.startsWith("https://");

    if (isProduction) {
      preferenceData.back_urls = {
        success: `${baseUrl}/payments/success`,
        failure: `${baseUrl}/payments/failure`,
        pending: `${baseUrl}/payments/pending`,
      };
      preferenceData.auto_return = "approved";
    }

    if (process.env.MP_WEBHOOK_URL) {
      preferenceData.notification_url = process.env.MP_WEBHOOK_URL;
    }

    const result = await preference.create({
      body: preferenceData,
    });

    return {
      id: result.id,
      init_point: result.init_point,
      statusCode: 200,
    };
  } catch (error) {
    console.error("❌ Error creando preferencia de Mercado Pago:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    if (error.cause) {
      console.error("Error cause:", error.cause);
    }
    throw error;
  }
};
