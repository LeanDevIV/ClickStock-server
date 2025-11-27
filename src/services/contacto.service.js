import Contacto from "../models/Contacto.js";

export const crearContacto = async (data) => {
  try {
    const contacto = await Contacto.create(data);
    return contacto;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    throw new Error("No se pudo crear el contacto");
  }
};

export const obtenerContactos = async () => {
  try {
    const contactos = await Contacto.find().sort({ fecha: -1 });
    return contactos;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw new Error("No se pudieron obtener los contactos");
  }
};

export const obtenerContactoPorId = async (id) => {
  try {
    const contacto = await Contacto.findById(id);
    return contacto;
  } catch (error) {
    console.error("Error al obtener contacto por ID:", error);
    throw new Error("No se pudo obtener el contacto");
  }
};

export const actualizarContacto = async (id, data) => {
  try {
    const contactoActualizado = await Contacto.findByIdAndUpdate(id, data, {
      new: true,
    });
    return contactoActualizado;
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    throw new Error("No se pudo actualizar el contacto");
  }
};

export const eliminarContacto = async (id) => {
  try {
    const contactoEliminado = await Contacto.findByIdAndDelete(id);
    return contactoEliminado;
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    throw new Error("No se pudo eliminar el contacto");
  }
};
