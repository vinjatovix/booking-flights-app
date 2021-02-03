'use strict';
const { getAirportByIATA } = require('../../repositories/location/location-repository');
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
    const existingAirport = await getAirportByIATA(iata);

    return await getAirportId(existingAirport, iata, next);
  } catch (err) {
    err.code = err.code || 500;
    err.details = err.details || 'Error obteniendo airportID';
    next(err);
  }
}
module.exports = { airportID };
