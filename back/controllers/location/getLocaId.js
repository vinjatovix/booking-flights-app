'use strict';
const { createCity, getCityByName } = require('../../repositories/location/location-repository');

/**
 * Search on MySQL DB for Loca_ID, if not exists creates a new city in DB
 *
 * @param {String} locaNombre "City name to search for"
 * @param {String} paisId "Country ISO2 attached to that city"
 * @param {*} next "Error control middleware"
 * @return {Number} "City id in DB"
 */
async function getLocaId({ city, latitude, longitude }, paisId, next) {
  try {
    //? Buscamos la ciudad en la base
    const [cityStoredInDB] = await getCityByName(city);
    if (cityStoredInDB !== undefined && cityStoredInDB.Loca_ID > 0) {
      return cityStoredInDB.Loca_ID;
    }

    //? si no existe la creamos
    latitude = latitude > 0 ? +latitude.toFixed(4) : -latitude.toFixed(4);
    longitude = longitude > 0 ? +longitude.toFixed(4) : -longitude.toFixed(4);

    const newCityData = [city, paisId, latitude, longitude];
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
