'use strict';

const { fileMaxSize, fileMinSize, validateExtension, createFileChunk } = require('./utils');

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
    const error = new Error('No files were provided');
    error.code = 400;
    throw error;
  }

  //? Preparamos el chunk a comparar
  const fileBuffer = await createFileChunk(req);

  //? verificamos que la extension que nos devuelve read-chunk es una de las permitidas
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];
  validateExtension(fileBuffer, validExtensions);

  const archivo = req.files.archivo;
  //? tamaño máximo
  fileMaxSize(archivo, 5);

  //? tamaño mínimo
  fileMinSize(archivo, 0);

  return archivo;
}
module.exports = { validateImage };
