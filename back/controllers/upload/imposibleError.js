'use strict';

/**
 * This is a callback needed for deleting files.
 * this should never happen.
 *
 * @return {Error}
 */
function imposibleError() {
  return (error) => {
    if (error) {
      error.code = 500;
      error.details = 'SI ESTO OCURRIESE ALGUNA VEZ, EL UNIVERSO ENTERO SE HA ROTO';
      throw error;
    }
  };
}
module.exports = { imposibleError };
