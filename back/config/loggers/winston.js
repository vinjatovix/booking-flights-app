"use strict";

const winston = require("winston");
const path = require("path");

/**
 * Esta clase define los transportes de winston hacia el archivo y hacia la consola
 * @type {*}
 * */
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: path.join(__dirname, "../../logs/42.log"),
      handleExceptions: true,
      json: true,
      maxsize: 5240880,
      maxFiles: 5,
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
    }),
  ],
  exitOnError: false,
});

//? Este método que hace pipe hacia el logFile,
//? replace se carga los saltos de linea \n que incrusta morgan en el string del log
logger.stream = {
  write: function (message, encoding) {
    logger.info(message.replace(/\n$/, ""));
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
    `ERROR: ${err.code} - ip: ${req.ip} - method: ${req.method} - url: ${
      req.originalUrl
    } - ${err.message}} - ${new Date(Date.now()).toUTCString()}`
  );
}

/**
 * Esta es el MiddleWare? que se pone al final de todas las rutas para capturar los errores que puedan
 * producir y mandarlos al logFile
 *
 * @return {*}
 */
function winstonCatch() {
  return function (err, req, res, next) {
    logThis(err, req);
    next(err);
    res.status(err.code).send({ error: `${err.message}` });
  };
}

module.exports = { logger, winstonCatch };
