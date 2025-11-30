import { subirArchivoService } from "../services/upload.service.js";

/**
 * Controlador para subir un archivo
 * Endpoint: POST /api/uploads/:directorio
 * Body: FormData con campo 'file'
 */
export const subirArchivoController = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        error: "No se ha enviado ningún archivo",
      });
    }

    const { file } = req.files;
    const { directorio } = req.params;

    if (!directorio) {
      return res.status(400).json({
        error: "Debe especificar un directorio destino",
      });
    }

    const url = await subirArchivoService(file, directorio);

    res.status(200).json({
      mensaje: "Archivo subido exitosamente",
      url: url,
    });
  } catch (error) {
    next(error);
  }
};
