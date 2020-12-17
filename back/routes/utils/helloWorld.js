'use strict';

/**
 * Esta es la funcion de test de la ruta /
 *
 * @return {*}
 */
function helloWorld() {
  return (req, res) => {
    res.status(200).send({
      title: 'LO (&& behold ^^)',
      message: 'Route / is working properly',
    });
  };
}
module.exports = { helloWorld };
