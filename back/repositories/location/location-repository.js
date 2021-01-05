'use strict';

const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

const { getCountryByCode } = require('./getCountryByCode');
const { getCountryByName } = require('./getCountryByName');
const { getCountryIdByCode } = require('./getCountryIdByCode');

const { getAirportByIATA } = require('./getAirportByIATA');
const { createAirport } = require('./createAirport');

const { getCityByName } = require('./getCityByName');
const { createCity } = require('./createCity');

const { getAirlineByIATA } = require('./getAirlineByIATA');

// TODO: No soy capaz de exportar esto como modulo a otro archivo sin que dé error
/**
 * Register a new airline in MySQL DB
 *
 * @param {Array} airlineData [Cmp_iata, Cmp_nombre]
 * @return {number}  "Airline Id"
 */
async function createAirline(airlineData, next) {
  try {
    const pool = await db.getPool();
    const query = 'INSERT INTO Companias (Cmp_iata, Cmp_nombre) VALUES (?,?)';
    const [result] = await pool.execute(query, airlineData);
    verifyMysqlWrite(result);
    return result.insertId;
  } catch (error) {
    next(error);
  }
}
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
