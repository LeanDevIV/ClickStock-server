import {
  crearNuevoContacto,
  obtenerTodosLosContactos,
  cambiarEstadoContacto,
} from "../services/contacto.Service.js";

// Crear contacto
export const crearContacto = async (req, res) => {
  try {
    const nuevoContacto = await crearNuevoContacto(req.body);
    res.status(201).json({ msg: "Mensaje enviado correctamente", contacto: nuevoContacto });
  } catch (error) {
    res.status(400).json({ msg: "Error al enviar el mensaje", error: error.message });
  }
};

// Obtener contactos
export const obtenerContactos = async (req, res) => {
  try {
    const contactos = await obtenerTodosLosContactos();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los mensajes", error: error.message });
  }
};

// Actualizar estado
export const actualizarEstadoContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const contactoActualizado = await cambiarEstadoContacto(id, estado);

    if (!contactoActualizado) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }

    res.status(200).json(contactoActualizado);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar el contacto", error: error.message });
  }
};
