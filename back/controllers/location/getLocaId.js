'use strict';

const { createCity, getCityByName } = require('../../repositories/location/location-repository');

async function getLocaId({ city, latitude, longitude }, paisId, next) {
  try {
    const [cityStoredInDB] = await getCityByName(city);
    if (cityStoredInDB !== undefined && cityStoredInDB.Loca_ID > 0) {
      return cityStoredInDB.Loca_ID;
    }

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
