'use strict';
const db = require('../../infraestructure/database');

/**
 * Register a new airline in MySQL DB
 *
 * @param {Array} airlineData [Cmp_iata, Cmp_nombre]
 * @return {Number}  "Airline Id"
 */
async function createAirline(airlineData) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Companias (Cmp_iata, Cmp_nombre) VALUES (?,?)';
  const [result] = await pool.execute(query, airlineData);

  return result.insertId;
}
module.exports = { createAirline };
