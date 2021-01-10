'use strict';

const { fileMaxSize, fileMinSize, validateExtension, createFileChunk } = require('../utils/utils-controller');

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

  //? Preparamos el chunk a comparar
  const fileBuffer = await createFileChunk(archivo);
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];
  validateExtension(fileBuffer, validExtensions);

  fileMaxSize(archivo, 5);
  fileMinSize(archivo, 0);

  return archivo;
}
module.exports = { validateImage };
