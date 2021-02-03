'use strict';
const db = require('../../infraestructure/database');

/**
 * Muestra el nombre del aeropuerto de origen o destino del vuelo según su id
 *
 * @param {*} number (id)
 */

async function getAirport(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Aeropuertos WHERE Aero_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}
module.exports = { getAirport };
