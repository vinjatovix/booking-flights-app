'use strict';

const {
  fileMaxSize,
  fileMinSize,
  validateExtension,
  createFileChunk,
  deleteFile,
} = require('../utils/utils-controller');

/**
 * Esta funcion valida el archivo subido por el usuario con respecto a los parametros que prefijamos,
 * en este caso el mimetype debe de ser imagen y solo se permiten 4 extensiones.
 * El tamaño máximo de archivo serán de 5mb
 *
 * @param {*} req
 * @return {*}
 */
async function validateImage(req) {
  if (!req.files) {
    const error = new Error();
    error.code = 400;
    error.details = 'No files were provided';
    throw error;
  }
  const archivo = req.files.archivo;

  if (archivo.size > 5000000) {
    const error = new Error();
    error.code = 400;
    error.details = 'File size is too large, image size must be less than 5mb.';
    throw error;
  }
  if (archivo.size <= 0) {
    const error = new Error();
    error.code = 400;
    error.details = 'File is empty or corrupted';
    throw error;
  }

  //? Preparamos el chunk a comparar
  const fileBuffer = await createFileChunk(archivo);
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];
  if (!validateExtension(fileBuffer, validExtensions)) {
    await deleteFile(archivo.tempFilePath);
    const error = new Error();
    error.code = 400;
    error.details = 'That file is not valid...';
    throw error;
  }

  return archivo;
}
module.exports = { validateImage };
