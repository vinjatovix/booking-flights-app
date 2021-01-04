'use strict';
const db = require('../../infraestructure/database');

/**
 * Search in MySQL DB an airline by IATA code
 *
 * @param {String} iata2 "2 char"
 * @return {Array} "Airline Data"
 */
const getAirlineByIATA = async (iata2) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Companias WHERE Cmp_iata = ?';
  const [result] = await pool.execute(query, iata2);

  return result;
};

module.exports = { getAirlineByIATA };
