import Contacto from "../models/Contacto.js";

// Crear un nuevo contacto
export const crearNuevoContacto = async (data) => {
  const nuevoContacto = new Contacto(data);
  return await nuevoContacto.save();
};

// Obtener todos los contactos
export const obtenerTodosLosContactos = async () => {
  return await Contacto.find().sort({ fecha: -1 });
};

// Actualizar estado de contacto
export const cambiarEstadoContacto = async (id, estado) => {
  const contactoActualizado = await Contacto.findByIdAndUpdate(
    id,
    { estado },
    { new: true }
  );
  return contactoActualizado;
};
