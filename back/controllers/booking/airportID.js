'use strict';
const { getAirportByIATA } = require('../../repositories/location/location-repository');
const { getAirportId } = require('../location/location-controller');

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
