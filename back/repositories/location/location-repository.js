'use strict';

const db = require('../../infraestructure/database');

const { getCountryByCode } = require('./getCountryByCode');
const { getCountryByName } = require('./getCountryByName');
const { getCountryIdByCode } = require('./getCountryIdByCode');

const { getAirportByIATA } = require('./getAirportByIATA');
const { createAirport } = require('./createAirport');

const { getCityByName } = require('./getCityByName');
const { createCity } = require('./createCity');

const { getAirlineByIATA } = require('./getAirlineByIATA');

/**
 * Register a new airline in MySQL DB
 *
 * @param {Array} airlineData [Cmp_iata, Cmp_nombre]
 * @return {number}  "Airline Id"
 */
const createAirline = async (airlineData) => {
  const pool = await db.getPool();
  const query = 'INSERT INTO Companias (Cmp_iata, Cmp_nombre) VALUES (?,?)';
  const [result] = await pool.execute(query, airlineData);

  return result.insertId;
};
module.exports = {
  getCountryByCode,
  getCountryByName,
  getCountryIdByCode,
  getAirportByIATA,
  getCityByName,
  createCity,
  createAirport,
  getAirlineByIATA,
  createAirline,
};
