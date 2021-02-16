'use strict';

const { createAirline } = require('./createAirline');
const { createAirport } = require('./createAirport');
const { createCity } = require('./createCity');
const { getAirlineByIATA } = require('./getAirlineByIATA');
const { getAirportByIATA } = require('./getAirportByIATA');
const { getAirport } = require('./getAirport');
const { getCityByName } = require('./getCityByName');
const { getCountryIdByCode } = require('./getCountryIdByCode');
const { getCountryByCode } = require('./getCountryByCode');
const { getCountryByName } = require('./getCountryByName');
const { getTown } = require('./getTown');

module.exports = {
  createAirline,
  createAirport,
  createCity,
  getAirlineByIATA,
  getAirportByIATA,
  getCityByName,
  getAirport,
  getCountryIdByCode,
  getCountryByCode,
  getCountryByName,
  getTown,
};
