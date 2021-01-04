'use strict';

const { fetchAmadeus } = require('../amadeus/amadeus-controller');
const locationRepository = require('../../repositories/location/location-repository');

async function getAirlineId(isOriginInDb, iata, next) {
  if (!isOriginInDb || isOriginInDb.length === 0) {
    //? Si la aerolinea no existe la damos de alta
    const airlineInfoUrl = `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${iata}`;
    const { data } = await fetchAmadeus(airlineInfoUrl, next);
    const newAirline = [`${iata}`, data[0].commonName];
    const newAirlineId = await locationRepository.createAirline(newAirline);
    return newAirlineId;
  }
  return isOriginInDb[0].Cmp_ID;
}
module.exports = { getAirlineId };
