'use strict';

const { getCountryByName } = require('../../repositories/location/location-repository');

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
