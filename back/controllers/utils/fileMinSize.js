'use strict';
/**
 * Verifies Corrupted Files
 *
 * @param {*} archivo
 * @param {*} size
 */
function fileMinSize(archivo, size) {
  if (archivo.size <= size) {
    const error = new Error();
    error.code = 400;
    error.details = 'File is empty or corrupted';
    throw error;
  }
  return true;
}
module.exports = { fileMinSize };
