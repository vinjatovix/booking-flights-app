'use strict';

function validateReturn(response, expected = 'unknown', code = 500) {
  if (!response || response.length === 0) {
    const error = new Error(`Error fetching ${expected}`);
    error.code = code;
    error.details = { expected };
    throw error;
  }
  return true;
}
module.exports = { validateReturn };
