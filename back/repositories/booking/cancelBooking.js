'use strict';
const db = require('../../infraestructure/database');

/**
 * Actualiza el estado de una reserva a Cancelada
 *
 * @param {*} array [id]
 */

async function cancelBooking(id) {
  const pool = await db.getPool();
  const query = 'UPDATE ReservaCabeceras SET RC_Status = "c" WHERE RC_ID = ?';
  const [result] = await pool.execute(query, id);

  return result;
}
module.exports = { cancelBooking };
