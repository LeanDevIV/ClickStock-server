import { put, del } from "@vercel/blob";

/**
 * Sube un archivo a Vercel Blob.
 *
 * @param {Object} file - El objeto de archivo de express-fileupload.
 * @param {string} DIR_NAME - El nombre del directorio (prefijo) donde se guardará el archivo.
 * @returns {Promise<string>} - La URL del archivo subido.
 */
export async function uploadFile(file, DIR_NAME) {
  if (!file || !file.name) {
    throw new Error("El archivo es inválido o no tiene nombre");
  }

  const filename = `${DIR_NAME}/${Date.now()}-${file.name
    .replace(/\s+/g, "_")
    .toLowerCase()}`;

  const blob = await put(filename, file.data, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: file.mimetype,
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
  }
}
