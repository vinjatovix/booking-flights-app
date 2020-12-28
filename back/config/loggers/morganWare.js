'use strict';

const morgan = require('morgan');
const { morganSchema } = require('./morganSchema'); //? Formato
const { logger } = require('./winston'); //? Método para loggear

/**
 *Este Middleware registra los accesos a las rutas mediante el stream de winston
 *
 * @return {row @ logFile}
 *  */
function morganWare() {
  return morgan(morganSchema, { immediate: true, stream: logger.stream });
}

module.exports = { morganWare };
