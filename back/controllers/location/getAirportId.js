'use strict';
const { fetchAmadeus } = require('../amadeus/amadeus-controller');
const locationRepository = require('../../repositories/location-repository');
const { makeAirportInfoUrl } = require('../amadeus/makeAirportInfoUrl');
const { getPaisId } = require('./getPaisId');
const { getLocaId } = require('./getLocaId');
const airports = require('airportsjs');
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
  if (!isOriginInDb || isOriginInDb.length === 0) {
    //? Si no existe hay que registrarlo.
    const airportInfo = airports.lookupByIataCode(originLocationCode);
    console.log(airportInfo);
    //? A que pais pertenece (Necesitamos Pais_ID)
    const { name, country, latitude, longitude } = airportInfo;
    const paisId = await getPaisId(country);
    console.log(paisId);
    //? A que ciudad pertence (Necesitamos Loca_ID)
    const locaId = await getLocaId(airportInfo, paisId, next);
    console.log(locaId);
    const aeropuerto = [name, originLocationCode, locaId, paisId, latitude, longitude];
    const newAirportId = await locationRepository.createAirport(aeropuerto);
    return newAirportId;
  }
  return isOriginInDb[0].Aero_ID;
}
module.exports = { getAirportId };
