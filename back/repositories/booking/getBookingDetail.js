'use strict';
const db = require('../../infraestructure/database');

/**
 * Muestra el historial de reservas de detalle del usuario
 *
 * @param {*} number (id)
 */

async function getBookingDetail(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM ReservaDetalles WHERE RD_RCID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getBookingDetail };
