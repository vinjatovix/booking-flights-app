'use strict';
const db = require('../../infraestructure/database');

async function createAirline(airlineData, next) {
  try {
    const pool = await db.getPool();
    const query = 'INSERT INTO Companias (Cmp_iata, Cmp_nombre) VALUES (?,?)';
    const [result] = await pool.execute(query, airlineData);
    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 503 : error.code;
    next(error);
  }
}
module.exports = { createAirline };
