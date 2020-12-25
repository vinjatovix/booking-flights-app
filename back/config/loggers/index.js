'use strict';

//? Los logs de desarrollo se guardan en /logs/42.log

const { morganWare } = require('./morganWare'); //? Morgan se encarga de loggear los accesos
const { winstonCatch } = require('./winston'); //? para todo lo demás winston

module.exports = { morganWare, winstonCatch };
