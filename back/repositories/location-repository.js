'use strict';

const db = require('../infraestructure/database');

//? COUNTRIES
/**
 * Returns a Country for the matching iso2 code
 *
 * @param {String} iso2 "Uppercase 2 Chars string"
 * @return {Array} "My SQL row"
 */
const getCountryByCode = async (iso2) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Paises WHERE Pais_iso2 = ?';
  const [result] = await pool.execute(query, [iso2]);

  return result;
};
/**
 * Returns a Country for the matching name
 *
 * @param {String} countryName
 * @return {Array}
 */
const getCountryByName = async (countryName) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Paises WHERE Pais_nombre = ?';
  const [result] = await pool.execute(query, [countryName]);

  return result;
};

async function getCountryIdByCode(iso2) {
  console.log('ISO2', iso2);
  const pool = await db.getPool();
  const query = 'SELECT Pais_ID FROM Paises WHERE Pais_iso2 = ?';
  const [result] = await pool.execute(query, [iso2]);
  console.log(result);
  return result;
}
//? CITIES

const getCityByCode = async (cityCode) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Localidades WHERE Loca_cityCode like ?';
  const [result] = await pool.execute(query, [cityCode]);

  return result;
};
/**
 * Returns MySQL Result with cities with a given string
 *
 * @param {String} cityName
 * @return {Array}
 */
async function getCityByName(cityName) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Localidades WHERE Loca_nombre = ?';
  const [result] = await pool.execute(query, [cityName]);

  return result;
}
/**
 * Inserts city data in MySQL DB
 *
 * @param {Array} cityData [Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud, Loca_citycode]
 * @return {Array}
 */
async function createCity(cityData) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Localidades (Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud) VALUES(?,?,?,?)';
  const [result] = await pool.execute(query, cityData);

  return result.insertId;
}

//? AIRPORTS
/**
 * Search in MySQLDB an airport by IATA code
 *
 * @param {String} iata "3 characters"
 * @return {Array}
 */
async function getAirportByIATA(iata) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Aeropuertos WHERE Aero_iata = ?';
  const [result] = await pool.execute(query, [iata]);

  return result;
}

async function createAirport(array) {
  const pool = await db.getPool();
  const query =
    'INSERT INTO Aeropuertos (Aero_nombre, Aero_iata, Aero_LocaID, Aero_PaisID, Aero_latitud, Aero_longitud) VALUES (?,?,?,?,?,?)';
  const [result] = await pool.execute(query, array);

  return result.insertId;
}

//? AIRLINES

/**
 * Search in MySQL DB an airline by IATA code
 *
 * @param {String} iata "2 char"
 * @return {number} "Airline Id"
 */
const getAirlineByIATA = async (iata) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Companias WHERE Cmp_iata = ?';
  const [result] = await pool.execute(query, iata);
  return result;
};

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
  getCityByName,
  getAirportByIATA,
  getCityByCode,
  createCity,
  createAirport,
  getAirlineByIATA,
  createAirline,
};
