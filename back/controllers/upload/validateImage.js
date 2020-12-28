'use strict';

const FileType = require('file-type');
const readChunk = require('read-chunk');

async function validateImage(req) {
  if (!req.files) {
    const error = new Error('No files were provided');
    error.code = 400;
    throw error;
  }

  const tmpFile = req.files.archivo.tempFilePath;
  const buffer = readChunk.sync(tmpFile, 0, 4100);
  const tipo = await FileType.fromBuffer(buffer);

  const archivo = req.files.archivo;
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];
  if (!tipo || tipo.length === 0 || !validExtensions.includes(tipo.ext)) {
    const error = new Error('That file is not valid...');
    error.code = 400;
    throw error;
  }

  if (archivo.size > 5000000) {
    const error = new Error('File size is too large, image size must be less than 5mb.');
    error.code = 400;
    throw error;
  }

  if (archivo.size <= 0) {
    const error = new Error('File is empty or corrupted');
    error.code = 400;
    throw error;
  }

  return archivo;
}
module.exports = { validateImage };
