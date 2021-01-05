'use strict';
const locationRepository = require('../../repositories/location/location-repository');
const { getAirportId } = require('../location/location-controller');
/**
 *  Returns an airport id for a given IATA code
 *
 * @param {String} iata "3 chars code"
 * @param {*} next
 * @return {Number} "number id"
 */
async function airportID(iata, next) {
  try {
    //? Se busca el aeropuerto en la base MySQL que puede o no estar
    const storedAirport = await locationRepository.getAirportByIATA(iata);

    //? Se devuelve un ID de aeropuerto
    return await getAirportId(storedAirport, iata, next);
  } catch (err) {
    next(err);
  }
}
module.exports = { airportID };
