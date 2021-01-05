'use strict';

const winston = require('winston');
const path = require('path');

/**
 * Esta clase define los transportes de winston hacia el archivo y hacia la consola
 * @type {*}
 * */
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: path.join(__dirname, '../../logs/42.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5240880,
      maxFiles: 5,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
    }),
  ],
  exitOnError: false,
});

//? Este método que hace pipe hacia el logFile,
//? replace se carga los saltos de linea \n que incrusta morgan en el string del log
logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write: function (message, encoding) {
    logger.info(message.replace(/\n$/, ''));
  },
};

/**
 * Esto es lo que da formato a los mensajes de winston
 *
 * @param {*} err
 * @param {*} req
 */
function logThis(err, req) {
  logger.error(
    `ERROR: ${err.code} - ip: ${req.ip} - method: ${req.method} - url: ${req.originalUrl} - ${
      err.message
    }} - ${new Date(Date.now()).toUTCString()}`
  );
}

/**
 * Esta es el MiddleWare? que se pone al final de todas las rutas para capturar los errores que puedan
 * producir y mandarlos al logFile
 *
 * @return {*}
 */
function winstonCatch() {
  // eslint-disable-next-line no-unused-vars
  return function (err, req, res, next) {
    if (err.name === 'ValidationError') {
      err.code = 400;
    }
    if (err.code === 'EAI_AGAIN') {
      err.message = `${process.env.DATABASE_HOST} is'n a known host.`;
      err.code = 400;
    }
    if (err.code === 'ECONNREFUSED') {
      err.message = `Connection to port ${process.env.DATABASE_PORT} refused. Please, check settings.`;
      err.code = 400;
    }
    if (err.code === 'ER_BAD_DB_ERROR') {
      err.message = `Are you sure '${process.env.DATABASE_NAME}' is the correct database name?`;
      err.code = 400;
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      err.message = 'Access denied';
      err.code = 401;
    }

    logThis(err, req);
    res.json(err);
  };
}

module.exports = { logger, winstonCatch };
