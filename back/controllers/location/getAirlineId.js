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
    if (isOriginInDb[0] !== undefined && isOriginInDb[0].Cmp_ID > 0) {
      return isOriginInDb[0].Cmp_ID;
    }
    //? Si la aerolinea no existe la damos de alta
    const airlineInfoUrl = `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${iata}`;
    const { data: amadeusAirlineInfo } = await fetchAmadeus(airlineInfoUrl, next);

    //? Si amadeus no nos responde no podemos darla de alta
    validateReturn(amadeusAirlineInfo, 'Airline Info', 503);

    //? Introducimos la comapñia aérea en el sistema
    const newAirline = [iata, amadeusAirlineInfo[0].commonName];
    return await locationRepository.createAirline(newAirline, next);
  } catch (error) {
    next(error);
  }
}
module.exports = { getAirlineId };
