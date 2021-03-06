'use strict';

function imposibleError() {
  return (error) => {
    if (error) {
      error.details = 'SI ESTO OCURRIESE ALGUNA VEZ, EL UNIVERSO ENTERO SE HA ROTO';
      throw error;
    }
  };
}
module.exports = { imposibleError };
