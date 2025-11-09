import {
  crearContacto,
  obtenerContactos,
  obtenerContactoPorId,
  actualizarContacto,
  eliminarContacto
} from "../services/contacto.service.js";

export const crearNuevoContacto = async (req, res) => {
  try {
    const contacto = await crearContacto(req.body);
    res.status(201).json({
      ok: true,
      msg: "Contacto creado",
      contacto,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error al crear contacto" });
  }
};

export const obtenerTodos = async (req, res) => {
  try {
    const contactos = await obtenerContactos();
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error al obtener contactos" });
  }
};

export const obtenerPorId = async (req, res) => {
  try {
    const contacto = await obtenerContactoPorId(req.params.id);
    if (!contacto) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error al obtener contacto" });
  }
};

export const actualizarPorId = async (req, res) => {
  try {
    const contacto = await actualizarContacto(req.params.id, req.body);
    if (!contacto) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }
    res.json({ msg: "Contacto actualizado", contacto });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error al actualizar contacto" });
  }
};

export const eliminarPorId = async (req, res) => {
  try {
    const contacto = await eliminarContacto(req.params.id);
    if (!contacto) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }
    res.json({ msg: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error al eliminar contacto" });
  }
};
