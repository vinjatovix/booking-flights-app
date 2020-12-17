"use strict";

/**
 * Esta funcion testea la el sistema  de logs a traves de la ruta /testError
 *
 * @return {*}
 */
function testError() {
  return function (req, res) {
    const err = new Error("Simple Error Log test");
    err.code = 500;
    throw err;
  };
}

module.exports = {
  testError,
};
