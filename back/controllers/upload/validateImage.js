'use strict';

const { validateExtension, createFileChunk, deleteFile } = require('../utils/utils-controller');

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
    error.details = 'No se ha detectado ningun archivo';
    throw error;
  }
  const archivo = req.files.archivo;

  if (archivo.size > 5000000) {
    const error = new Error();
    error.code = 400;
    error.details = 'El archivo no puede pesar mas de 5mb';
    throw error;
  }
  if (archivo.size <= 0) {
    const error = new Error();
    error.code = 400;
    error.details = 'El archivo está vacío o corrupto';
    throw error;
  }

  //? Preparamos el chunk a comparar
  const fileBuffer = await createFileChunk(archivo);
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];
  if (!validateExtension(fileBuffer, validExtensions)) {
    await deleteFile(archivo.tempFilePath);
    const error = new Error();
    error.code = 400;
    error.details = 'Ese tipo de archivo no está permitido. Solo jpg, png, gif y jpeg';
    throw error;
  }

  return archivo;
}
module.exports = { validateImage };
