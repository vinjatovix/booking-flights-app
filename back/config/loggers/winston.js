'use strict';

const winston = require('winston');
const path = require('path');
const { identifyError } = require('./identifyError');

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

logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write: function (message, encoding) {
    logger.info(message.replace(/\n$/, ''));
  },
};

function logThis(err, req) {
  logger.error({
    date: `${new Date(Date.now()).toUTCString()}`,
    head: { error: err.code, method: req.method, ip: req.ip, file: err.file },
    error: { url: req.originalUrl, details: err.details },
  });
}

function winstonCatch() {
  // eslint-disable-next-line no-unused-vars
  return function (err, req, res, next) {
    identifyError(err);
    logThis(err, req);
    res.status(err.code).json(err);
  };
}

module.exports = { logger, winstonCatch };
