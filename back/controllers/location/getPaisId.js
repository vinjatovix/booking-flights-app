'use strict';
const locationRepository = require('../../repositories/location/location-repository');

/**
 * Returns the id of the country stored in MySQL DB
 *
 * @param {String} countryName
 * @return {Number} "Country Id"
 */
async function getPaisId(countryName) {
  const [country] = await locationRepository.getCountryByName(countryName);
  const paisId = country.Pais_ID;

  //? It's supossed to be a table with countries stored in MySQL DB
  if (!country || country.length === 0) {
    const err = new Error();
    err.code = 404;
    err.details = `'¿El país ${countryName} existe?'`;
    throw err;
  }

  return paisId;
}
module.exports = { getPaisId };
