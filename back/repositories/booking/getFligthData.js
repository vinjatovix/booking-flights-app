'use strict';
const db = require('../../infraestructure/database');

/**
 * Muestra los datos de los vuelos según la reserva en detalle
 *
 * @param {*} number (Id_Vuelo)
 */

async function getFligthData(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Vuelos WHERE Vue_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getFligthData };
