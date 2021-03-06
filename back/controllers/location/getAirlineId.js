'use strict';

const { createAirline } = require('../../repositories/location/location-repository');
const { fetchAmadeus } = require('../amadeus/amadeus-controller');
const { validateReturn } = require('../utils/utils-controller');

async function getAirlineId(isOriginInDb, iata, next) {
  try {
    if (isOriginInDb[0] !== undefined && isOriginInDb[0].Cmp_ID > 0) {
      return isOriginInDb[0].Cmp_ID;
    }
    const airlineInfoUrl = `https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${iata}`;
    const { data: amadeusAirlineInfo } = await fetchAmadeus(airlineInfoUrl, next);
    validateReturn(amadeusAirlineInfo, 'Airline Info', 503);
    const newAirline = [iata, amadeusAirlineInfo[0].commonName];

    return await createAirline(newAirline, next);
  } catch (error) {
    next(error);
  }
}
module.exports = { getAirlineId };
