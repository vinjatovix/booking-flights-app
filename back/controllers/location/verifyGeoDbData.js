'use strict';
/**
 * Returns Error if no data is given
 *
 * @param {*} data
 * @return {*}
 */
function verifyGeoDbData(data) {
  if (!data || data.length === 0) {
    const error = new Error('Cant find info about that city on internet DB... What a pitty');
    error.code = 404;
    throw error;
  }
  return true;
}
module.exports = { verifyGeoDbData };
