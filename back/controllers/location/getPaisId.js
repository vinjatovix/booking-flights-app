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
  if (!country || country.length === 0) {
    const err = new Error('Country not found, are you sure?');
    err.code = 400;
    throw err;
  }
  return paisId;
}
module.exports = { getPaisId };
