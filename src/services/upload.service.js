import { uploadFile } from "../utils/upload.util.js";

/**
 * Servicio para subir un archivo a un directorio específico
 * @param {Object} file - Archivo a subir (de express-fileupload)
 * @param {string} directorio - Nombre del directorio destino (ej: 'productos', 'usuarios')
 * @returns {Promise<string>} - URL del archivo subido
 */
export const subirArchivoService = async (file, directorio) => {
  if (!file || !file.name) {
    throw new Error("El archivo es inválido o no tiene nombre");
  }

  if (!directorio) {
    throw new Error("Debe especificar un directorio destino");
  }

  const directorioValido = /^[a-zA-Z0-9-_]+$/.test(directorio);
  if (!directorioValido) {
    throw new Error("El nombre del directorio contiene caracteres inválidos");
  }

  const extensionesPermitidas = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  if (!extensionesPermitidas.test(file.name)) {
    throw new Error(
      "Tipo de archivo no permitido. Solo se permiten imágenes (jpg, jpeg, png, gif, webp, svg)"
    );
  }

  try {
    const url = await uploadFile(file, directorio);
    return url;
  } catch (error) {
    throw new Error(`Error al subir el archivo: ${error.message}`);
  }
};
