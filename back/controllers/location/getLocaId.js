'use strict';
const { createCity, getCityByName } = require('../../repositories/location/location-repository');
const fetch = require('node-fetch');
const { makeInfoCityUrl } = require('../GeoDB/geoDB-controller');
const { validateReturn } = require('../utils/utils-controller');
const { wait } = require('../utils/utils-controller');

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
    const [cityStoredInDB] = await getCityByName(airport.city);
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
    return await createCity(newCityData, next);
  } catch (err) {
    if (err.message === "Cannot read property '0' of undefined") {
      err.code = 503;
      err.details = 'El servidor de información de ciudades esta ocupado';
    }
    next(err);
  }
}
module.exports = { getLocaId };
