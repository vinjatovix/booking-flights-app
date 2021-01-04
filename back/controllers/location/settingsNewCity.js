'use strict';
const { fetchAmadeus } = require('../amadeus/fetchAmadeus');

/**
 *  Sets up city info to store in DB
 *
 * @param {String} url "Gathering info url"
 * @param {Number} paisId "Country ID"
 * @param {*} next "Error control Middleware"
 * @return {Array} "City fields to store in DB"
 */
async function settingsNewCity(url, paisId, next) {
  const { data } = await fetchAmadeus(url, next);
  const newCity = [data[0].address.cityName, paisId, data[0].geoCode.latitude, data[0].geoCode.longitude, data[0].id];
  return newCity;
}
module.exports = { settingsNewCity };
