'use strict';
const locationRepository = require('../../repositories/location/location-repository');
const { getPaisId } = require('./getPaisId');
const { getLocaId } = require('./getLocaId');
const airports = require('airportsjs');
const { validateReturn } = require('../utils/utils-controller');
/**
 *  May receive or not an array with info from MySQL DB.
 * if there is no airport stored will create a new one.
 * returns the airport id number sotred in DB
 *
 * @param {Array} isOriginInDb "MySQL response array"
 * @param {String} originLocationCode "IATA code"
 * @param {*} next
 * @return {Number} "Returns an Airport ID"
 */
async function getAirportId(isOriginInDb, originLocationCode, next) {
  try {
    if (!isOriginInDb || isOriginInDb.length === 0) {
      //? Si no hay info en la base MySQL buscará info en la librería
      const airportInfo = await airports.lookupByIataCode(originLocationCode);

      //? Si no hay info no podemos continuar
      validateReturn(airportInfo, 'New Airport Info', 404);

      const { name, country, latitude, longitude } = airportInfo;

      //? localizaará el país y localidad a los que pertenece
      const paisId = await getPaisId(country);
      const locaId = await getLocaId(airportInfo, paisId, next);

      //? Y guardará esa información en la base de datos
      const aeropuerto = [name, originLocationCode, locaId, paisId, latitude, longitude];
      return await locationRepository.createAirport(aeropuerto, next);
    }
    return isOriginInDb[0].Aero_ID;
  } catch (error) {
    error.code = error.code || 500;
    error.details = 'Unknown error about getAirportId';
    next(error);
  }
}
module.exports = { getAirportId };
