'use strict';

const { getCountryByCode } = require('./getCountryByCode');
const { getCountryByName } = require('./getCountryByName');
const { getCountryIdByCode } = require('./getCountryIdByCode');
const { getAirportByIATA } = require('./getAirportByIATA');
const { createAirport } = require('./createAirport');
const { getCityByName } = require('./getCityByName');
const { createCity } = require('./createCity');
const { getAirlineByIATA } = require('./getAirlineByIATA');
const { createAirline } = require('./createAirline');

module.exports = {
  getCountryByCode,
  getCountryByName,
  getCountryIdByCode,
  getAirportByIATA,
  createAirport,
  getCityByName,
  createCity,
  getAirlineByIATA,
  createAirline,
};
