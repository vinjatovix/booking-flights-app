'use strict';

const db = require('../../infraestructure/database');

/**
 *  Inserts a new booking on ReservaCabeceras
 *
 * @param {Object} bookingCache
 * @return {Number} "Inserted RC_ID"
 */

async function createBookingHeader(bookingCache, next) {
  try {
    const { RC_UsrID, RC_base, RC_total, RC_adults } = bookingCache.header;
    const array = [+RC_UsrID, +RC_base, +RC_total, +RC_adults];

    const pool = await db.getPool();
    const query = 'INSERT INTO ReservaCabeceras (RC_UsrID,RC_base,RC_total, RC_adults) VALUES (?,?,?,?)';
    const [result] = await pool.execute(query, array);

    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 500 : error.code;
    error.details = error.message;
    next(error);
  }
}
module.exports = { createBookingHeader };
