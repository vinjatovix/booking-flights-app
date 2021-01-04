'use strict';
const locationRepository = require('../../repositories/location/location-repository');
const fetch = require('node-fetch');
const { makeInfoCityUrl } = require('../GeoDB/geoDB-controller');

/**
 * Search on MySQL DB for Loca_ID, if not exists creates a new city in DB
 *
 * @param {String} locaNombre "City name to search for"
 * @param {String} paisId "Country ISO2 attached to that city"
 * @param {*} next "Error control middleware"
 * @return {Number} "City id in DB"
 */
async function getLocaId(airport, paisId) {
  const [city] = await locationRepository.getCityByName(airport.city);
  if (!city || city.length === 0) {
    let url = makeInfoCityUrl(airport);
    const { data } = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.CITIES_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    }).then((response) => {
      return response.json();
    });
    const newCity = data[0];
    const newCityData = [newCity.name, paisId, newCity.latitude, newCity.longitude];

    const newCityID = await locationRepository.createCity(newCityData);

    return newCityID;
  }
  return city.Loca_ID;
}
module.exports = { getLocaId };
