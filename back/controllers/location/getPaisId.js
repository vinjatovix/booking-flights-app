'use strict';
const { getCountryByName } = require('../../repositories/location/location-repository');

/**
 * Returns the id of the country stored in MySQL DB
 *
 * @param {String} countryName
 * @return {Number} "Country Id"
 */
async function getPaisId(countryName) {
  const [data] = await getCountryByName(countryName);

  if (!data || data.length === 0) {
    const err = new Error();
    err.code = 404;
    err.details = `'¿${countryName} existe?'`;
    throw err;
  }

  return data.Pais_ID;
}
module.exports = { getPaisId };
