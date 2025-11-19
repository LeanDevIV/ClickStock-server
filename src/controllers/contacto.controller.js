import { validationResult } from "express-validator";

import {
  crearContacto,
  obtenerContactos,
  obtenerContactoPorId,
  actualizarContacto,
  eliminarContacto
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
    res.status(200).json({
      ok: true,
      contactos,
    });
  } catch (error) {
    console.error("Error en obtenerTodos:", error);
    res.status(500).json({ ok: false, msg: "Error interno al obtener contactos" });
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
    res.status(500).json({ ok: false, msg: "Error interno al obtener contacto" });
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
    res.status(500).json({ ok: false, msg: "Error interno al actualizar contacto" });
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
    res.status(500).json({ ok: false, msg: "Error interno al eliminar contacto" });
  }
};
