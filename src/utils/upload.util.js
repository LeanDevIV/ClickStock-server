import { put, del } from "@vercel/blob";

/**
 * Sube un archivo a Vercel Blob.
 *
 * @param {Object} file - El objeto de archivo de express-fileupload.
 * @param {string} DIR_NAME - El nombre del directorio (prefijo) donde se guardará el archivo.
 * @returns {Promise<string>} - La URL del archivo subido.
 */
export async function uploadFile(file, DIR_NAME) {
  // Verificar que el archivo y su nombre existan
  if (!file || !file.name) {
    throw new Error("El archivo es inválido o no tiene nombre");
  }

  // Crear nombre de archivo único (incluyendo carpeta)
  // Vercel Blob maneja la unicidad, pero agregamos timestamp para evitar colisiones de nombres iguales
  const filename = `${DIR_NAME}/${Date.now()}-${file.name
    .replace(/\s+/g, "_")
    .toLowerCase()}`;

  // Subir a Vercel Blob
  // file.data es un Buffer (gracias a express-fileupload)
  const blob = await put(filename, file.data, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN, // Se toma automáticamente de process.env
    contentType: file.mimetype, // Metadatos para que el navegador sepa qué tipo de archivo es
  });

  return blob.url;
}

/**
 * Elimina un archivo de Vercel Blob.
 *
 * @param {string} url - La URL del archivo a eliminar.
 */
export async function deleteFile(url) {
  if (!url) return;

  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    console.error(`Error eliminando archivo de Blob (${url}):`, error);
    // No lanzamos error para no interrumpir el flujo principal (ej: borrar producto)
  }
}
