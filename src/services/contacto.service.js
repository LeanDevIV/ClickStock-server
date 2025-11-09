import Contacto from "../models/contacto.js";

export const crearContacto = async (data) => {
  return await Contacto.create(data);
};

export const obtenerContactos = async () => {
  return await Contacto.find().sort({ fecha: -1 });
};

export const obtenerContactoPorId = async (id) => {
  return await Contacto.findById(id);
};

export const actualizarContacto = async (id, data) => {
  return await Contacto.findByIdAndUpdate(id, data, { new: true });
};

export const eliminarContacto = async (id) => {
  return await Contacto.findByIdAndDelete(id);
};