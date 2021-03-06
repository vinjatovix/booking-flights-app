'use strict';

const morgan = require('morgan');
const { morganSchema } = require('./morganSchema');
const { logger } = require('./winston');

function morganWare() {
  return morgan(morganSchema, { immediate: true, stream: logger.stream });
}

module.exports = { morganWare };
