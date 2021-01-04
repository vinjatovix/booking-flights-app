'use strict';
const locationRepository = require('../../repositories/location-repository');
const { getAirportId } = require('../location/location-controller');
/**
 *  Returns an airport id for a given IATA code
 *
 * @param {String} iata "3 chars code"
 * @param {*} next
 * @return {Number} "number id"
 */
async function airportID(iata, next) {
  const isInDb = await locationRepository.getAirportByIATA(iata);
  const airportID = await getAirportId(isInDb, iata, next);
  return airportID;
}
module.exports = { airportID };
