'use strict';
const db = require('../../infraestructure/database');

async function getBookingDetail(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM ReservaDetalles WHERE RD_RCID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getBookingDetail };
