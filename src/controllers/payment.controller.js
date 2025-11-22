import * as paymentService from "../services/payment.service.js";

export const crearPreferencia = async (req, res) => {
  try {
    const { productos, usuario } = req.body;
    const urlRetorno = req.headers.origin || "http://localhost:5173";
    const preferencia = await paymentService.crearPreferencia(productos, urlRetorno, usuario);

    return res.json({ id: preferencia.id, init_point: preferencia.init_point });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
};