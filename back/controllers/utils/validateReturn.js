'use strict';

function validateReturn(response, expected = 'unknown', code = 404) {
  if (!response || response.length === 0) {
    const error = new Error();
    error.code = code;
    error.details = `${expected}. No encontrado`;
    throw error;
  }
  return true;
}
module.exports = { validateReturn };
