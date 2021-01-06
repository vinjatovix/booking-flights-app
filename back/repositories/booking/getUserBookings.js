'use strict';

const db = require('../../infraestructure/database');

/**
 * Muestra las reservas activas del usuario
 *
 * @param {*} number (id)
 */
async function getBookings(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM ReservaCabeceras WHERE RC_UsrID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getBookings };
