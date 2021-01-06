'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

/**
 * Creates a row in ReservaDetalles in MySQL DB
 *
 * @param {Object} bookingDetails
 * @return {Number} "Inserted RD_ID"
 */

async function createBookingDetail(bookingDetails) {
  const { RD_VueID, RD_RCID, RD_adults } = bookingDetails;
  const array = [RD_VueID, RD_RCID, RD_adults];

  const pool = await db.getPool();
  const query = 'INSERT INTO ReservaDetalles (RD_VueID,RD_RCID,RD_adults) VALUES (?,?,?)';
  const [result] = await pool.execute(query, array);
  verifyMysqlWrite(result);

  return result.insertId;
}

module.exports = { createBookingDetail };
