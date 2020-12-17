'use strict';

/**
 * Esta es la funcion para todas las rutas no definidas
 *
 * @return {*}
 */
function response404() {
  // eslint-disable-next-line no-unused-vars
  return (req, res) => {
    const err = new Error(`Sorry, Can't find ${req.url}`);
    err.code = 404;
    throw err;
  };
}

module.exports = { response404 };
