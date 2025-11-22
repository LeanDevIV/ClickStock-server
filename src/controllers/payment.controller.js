import * as paymentService from "../services/paymentService.js";

export const createPreference = async (req, res) => {
  try {
    const { items, user } = req.body;
    const returnUrl = req.headers.origin || "http://localhost:5173";
    const pref = await paymentService.createPreference(items, returnUrl, user);

    return res.json({ id: pref.id, init_point: pref.init_point });
  } catch (err) {
    console.error("Error creando preferencia:", err);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
};