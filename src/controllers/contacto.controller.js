import { validationResult } from "express-validator";
import { transporter } from "../config/nodemailer.js";

import {
  crearContacto,
  obtenerContactos,
  obtenerContactoPorId,
  actualizarContacto,
  eliminarContacto,
} from "../services/contacto.service.js";

export const crearNuevoContacto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array(),
      });
    }

    const contacto = await crearContacto(req.body);

    res.status(201).json({
      ok: true,
      msg: "Contacto creado correctamente",
      contacto,
    });
  } catch (error) {
    console.error("Error en crearNuevoContacto:", error);
    res.status(500).json({ ok: false, msg: "Error interno al crear contacto" });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const contactos = await obtenerContactos();
    res.status(200).json(contactos);
  } catch (error) {
    console.error("Error en obtenerTodos:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error interno al obtener contactos" });
  }
};

export const obtenerPorId = async (req, res) => {
  try {
    const contacto = await obtenerContactoPorId(req.params.id);

    if (!contacto) {
      return res.status(404).json({
        ok: false,
        msg: "Contacto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      contacto,
    });
  } catch (error) {
    console.error("Error en obtenerPorId:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error interno al obtener contacto" });
  }
};

export const actualizarPorId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array(),
      });
    }

    const contacto = await actualizarContacto(req.params.id, req.body);

    if (!contacto) {
      return res.status(404).json({
        ok: false,
        msg: "Contacto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Contacto actualizado correctamente",
      contacto,
    });
  } catch (error) {
    console.error("Error en actualizarPorId:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error interno al actualizar contacto" });
  }
};

export const eliminarPorId = async (req, res) => {
  try {
    const contacto = await eliminarContacto(req.params.id);

    if (!contacto) {
      return res.status(404).json({
        ok: false,
        msg: "Contacto no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Contacto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error en eliminarPorId:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error interno al eliminar contacto" });
  }
};

export const enviarCorreoContacto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array(),
      });
    }

    const { nombre, email, asunto, mensaje } = req.body;

    let nuevoContacto;
    try {
      nuevoContacto = await crearContacto({ nombre, email, asunto, mensaje });
    } catch (dbError) {
      console.error("Error al guardar contacto en BD:", dbError);
      return res.status(500).json({
        ok: false,
        msg: "Error al guardar el mensaje. Intente nuevamente.",
      });
    }

    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Nuevo mensaje de ${nombre} - ${asunto}`,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong><br>${mensaje}</p>
      `,
    });

    res.status(200).json({
      ok: true,
      msg: "Mensaje enviado y guardado correctamente",
      contacto: nuevoContacto,
    });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al procesar su solicitud",
    });
  }
};
