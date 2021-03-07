'use strict';

const airports = require('airportsjs');
const { createAirport } = require('../../repositories/location/location-repository');
const { getLocaId } = require('./getLocaId');
const { getPaisId } = require('./getPaisId');
const { validateReturn } = require('../utils/utils-controller');

async function getAirportId(isOriginInDb, originLocationCode, next) {
  try {
    if (isOriginInDb[0] !== undefined && isOriginInDb[0].Aero_ID > 0) {
      return isOriginInDb[0].Aero_ID;
    }

    const airportInfo = await airports.lookupByIataCode(originLocationCode);
    validateReturn(airportInfo, originLocationCode, 404);
    const { name, country, latitude, longitude } = airportInfo;
    const paisId = await getPaisId(country.trim());
    const locaId = await getLocaId(airportInfo, paisId, next);
    const aeropuerto = [name, originLocationCode, locaId, paisId, latitude, longitude];

    return await createAirport(aeropuerto, next);
  } catch (error) {
    error.code = error.code || 500;
    error.details = error.details || 'Error con getAirportId';
    next(error);
  }
}

module.exports = { getAirportId };
