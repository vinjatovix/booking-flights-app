'use strict';
const db = require('../../infraestructure/database');

async function getAirportByIATA(iata) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Aeropuertos WHERE Aero_iata = ?';
  const [result] = await pool.execute(query, [iata]);
  return result;
}
module.exports = { getAirportByIATA };
