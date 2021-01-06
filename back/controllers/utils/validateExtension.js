'use strict';
/**
 *  Compares a String with an array of valid extension
 *
 * @param {String} tipo
 * @param {Array} validExtensions
 */
function validateExtension(tipo, validExtensions) {
  if (!tipo || tipo.length === 0 || !validExtensions.includes(tipo.ext)) {
    const error = new Error();
    error.code = 400;
    error.details = 'That file is not valid...';
    throw error;
  }
  return true;
}
module.exports = { validateExtension };
