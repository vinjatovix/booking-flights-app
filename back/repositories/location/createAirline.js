'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

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
module.exports = { createAirline };
