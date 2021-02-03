'use strict';
/**
 * Returns Error if no data is given
 *
 * @param {*} data
 * @return {*}
 */
function verifyGeoDbData(data) {
  if (!data || data.length === 0) {
    const error = new Error();
    error.code = 404;
    error.details = 'No encuentro información sobre esa ciudad en internet... lo siento';
    throw error;
  }
  return true;
}
module.exports = { verifyGeoDbData };
