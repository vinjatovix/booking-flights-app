'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

/**
 *  Inserts a new booking on ReservaCabeceras
 *
 * @param {Object} bookingCache
 * @return {Number} "Inserted RC_ID"
 */

async function createBookingHeader(bookingCache) {
  const { RC_UsrID, RC_base, RC_total } = bookingCache.header;
  const array = [RC_UsrID, +RC_base, +RC_total * bookingCache.adults];

  const pool = await db.getPool();
  const query = 'INSERT INTO ReservaCabeceras (RC_UsrID,RC_base,RC_total) VALUES (?,?,?)';
  const [result] = await pool.execute(query, array);
  verifyMysqlWrite(result);
  return result.insertId;
}
module.exports = { createBookingHeader };
