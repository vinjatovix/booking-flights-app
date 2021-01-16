'use strict';

function validateReturn(response, expected = 'unknown', code = 404) {
  if (!response || response.length === 0) {
    const error = new Error();
    error.code = code;
    error.details = `Error fetching ${expected}. Not Found`;
    throw error;
  }
  return true;
}
module.exports = { validateReturn };
