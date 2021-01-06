'use strict';

/**
 * Limits File Max Size on Mb
 *
 * @param {*} archivo
 * @param {*} size
 */
function fileMaxSize(archivo, size) {
  if (archivo.size > size * 1000000) {
    const error = new Error();
    error.code = 400;
    error.details = 'File size is too large, image size must be less than 5mb.';
    throw error;
  }
  return true;
}

module.exports = { fileMaxSize };
