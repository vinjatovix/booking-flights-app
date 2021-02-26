'use strict';

const winston = require('winston');
const path = require('path');
const { identifyError } = require('./identifyError');

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
  logger.error({
    date: `${new Date(Date.now()).toUTCString()}`,
    head: { error: err.code, method: req.method, ip: req.ip, file: err.file },
    error: { url: req.originalUrl, details: err.details },
  });
}

/**
 * Esta es el MiddleWare? que se pone al final de todas las rutas para capturar los errores que puedan
 * producir y mandarlos al logFile
 *
 * @return {*}
 */
function winstonCatch() {
  return function (err, req, res, next) {
    //!!!!!!!! aunque el linter diga q no se usa, winton lo necesita
    identifyError(err);
    logThis(err, req);
    res.status(err.code).json(err);
  };
}

module.exports = { logger, winstonCatch };
