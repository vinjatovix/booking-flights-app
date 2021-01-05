'use strict';

const locationRepository = require('../../repositories/location/location-repository');
const { fetchAmadeus } = require('../amadeus/amadeus-controller');
const { validateReturn } = require('../utils/utils-controller');
/**
 * Returns The Airline ID stored in MySQL DB or Creeates a new one
 *
 * @param {Array} isOriginInDb "Should be an array with info from MySQL DB"
 * @param {*} iata
 * @param {*} next
 * @return {*}
 */
async function getAirlineId(isOriginInDb, iata, next) {
  try {
    if (!isOriginInDb || isOriginInDb.length === 0) {
      //? Si la aerolinea no existe la damos de alta
      const airlineInfoUrl = `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${iata}`;
      const { data: amadeusAirlineInfo } = await fetchAmadeus(airlineInfoUrl, next);

      //? Si amadeus no nos responde no podemos darla de alta
      validateReturn(amadeusAirlineInfo);

      //? Introducimos la comapñia aérea en el sistema
      const newAirline = [iata, amadeusAirlineInfo[0].commonName];
      const newAirlineId = await locationRepository.createAirline(newAirline, next);

      //? RESPONSE
      return newAirlineId;
    }
    return isOriginInDb[0].Cmp_ID;
  } catch (error) {
    next(error);
  }
}
module.exports = { getAirlineId };
