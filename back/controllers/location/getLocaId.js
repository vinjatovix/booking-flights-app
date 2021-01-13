'use strict';
const locationRepository = require('../../repositories/location/location-repository');
const path = require('path');
const fetch = require('node-fetch');
const { makeInfoCityUrl } = require('../GeoDB/geoDB-controller');
const { wait } = require('../utils/utils-controller');
const { validateReturn } = require('../utils/utils-controller');

/**
 * Search on MySQL DB for Loca_ID, if not exists creates a new city in DB
 *
 * @param {String} locaNombre "City name to search for"
 * @param {String} paisId "Country ISO2 attached to that city"
 * @param {*} next "Error control middleware"
 * @return {Number} "City id in DB"
 */
async function getLocaId(airport, paisId, next) {
  try {
    //? Buscamos la ciudad en la base
    const [cityStoredInDB] = await locationRepository.getCityByName(airport.city);
    if (cityStoredInDB !== undefined && cityStoredInDB.Loca_ID > 0) {
      return cityStoredInDB.Loca_ID;
    }

    //? Si no existe buscamos información sobre ella en internet
    await wait(1500); //! Margen de seguridad para las peticiones !!!!!!!!
    const cityInfoDealer = makeInfoCityUrl(airport);
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.CITIES_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    };

    const { data: geoDbCityInfo } = await fetch(cityInfoDealer, fetchOptions).then((loot) => loot.json());
    validateReturn(geoDbCityInfo, 'City information', 404); //? Si no encontramos información sobre la ciudad no podemos continuar.

    //? Si obtenemos información creamos la ciudad en la Base MySQL
    const newCity = geoDbCityInfo[0];
    const newCityData = [newCity.name, paisId, newCity.latitude, newCity.longitude];
    const newCityID = await locationRepository.createCity(newCityData, next);

    return newCityID;
  } catch (error) {
    if (error.message === "Cannot read property '0' of undefined") {
      error.code = 503;
      error.details = 'Cities Server Busy, please Try Again';
    }
    if (error.code === undefined || !error.code) {
      error.code = 500;
      error.details = 'unknown error at: ' + path.basename(__filename);
    }
    next(error);
  }
}
module.exports = { getLocaId };
