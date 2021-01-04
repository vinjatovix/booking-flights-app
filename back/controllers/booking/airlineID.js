'use strict';
const locationRepository = require('../../repositories/location/location-repository');
const { getAirlineId } = require('../location/getAirlineId');

/**
 *  Returns an airline id for a given IATA code
 *
 * @param {String} iata "2 chars code"
 * @param {*} next
 * @return {Number}
 */
async function airlineId(iata, next) {
  const isInDb = await locationRepository.getAirlineByIATA(iata);
  const airlineId = await getAirlineId(isInDb, iata, next);
  return airlineId;
}
module.exports = { airlineId };
