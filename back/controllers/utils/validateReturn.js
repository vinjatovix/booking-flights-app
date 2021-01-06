'use strict';
const path = require('path');

function validateReturn(response) {
  if (!response || response.length === 0) {
    const error = new Error('Error fetching data');
    error.code = 500;
    error.file = path.basename(__filename);
    throw error;
  }
  return true;
}
module.exports = { validateReturn };
