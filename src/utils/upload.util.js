import fs from 'fs';
import path from 'path';

/**
 * Sube un archivo al directorio especificado dentro de la carpeta storage/uploads.
 *
 * La función genera un nombre de archivo único basado en la fecha y hora actual,
 * y lo formatea eliminando espacios y reemplazándolos con guiones bajos. El
 * archivo se guarda como un buffer en el directorio designado.
 *
 * @param {Object} file - El objeto de archivo de express-fileupload que contiene los datos del archivo.
 * @param {string} DIR_NAME - El nombre del directorio dentro de la carpeta uploads donde se guardará el archivo.
 * @returns {Promise<string>} - La ruta relativa al archivo subido.
 */
export async function uploadFile(file, DIR_NAME) {
  // Verificar que el archivo y su nombre existan
  if (!file || !file.name) {
    throw new Error('El archivo es inválido o no tiene nombre');
  }

  // Generar fecha formateada para el nombre único
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14);

  // Crear nombre de archivo único
  const filename = `${formattedDate}-${file.name.replace(/\s+/g, '_').toLowerCase()}`;
  
  // Obtener el directorio de destino y asegurarse de que existe
  const uploadDirPath = path.resolve(
    process.cwd(),
    'storage',
    'uploads',
    DIR_NAME
  );

  // Crear el directorio si no existe
  if (!fs.existsSync(uploadDirPath)) {
    fs.mkdirSync(uploadDirPath, { recursive: true });
  }

  // Ruta completa del archivo
  const filePath = path.join(uploadDirPath, filename);

  // Guardar el archivo (file.data ya es un Buffer en express-fileupload)
  fs.writeFileSync(filePath, file.data);
  
  // Retornar la ruta relativa (el servidor ya sirve /storage como estático)
  // Si PUBLIC_BASE_URL está definido, lo usamos, sino retornamos ruta relativa
  const baseUrl = process.env.PUBLIC_BASE_URL || '';
  const relativePath = `/storage/uploads/${DIR_NAME}/${filename}`;
  
  return baseUrl ? `${baseUrl}${relativePath}` : relativePath;
}