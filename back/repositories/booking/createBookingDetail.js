'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

/**
 * Creates a row in ReservaDetalles in MySQL DB
 *
 * @param {Object} bookingDetails
 * @return {Number} "Inserted RD_ID"
 */

async function createBookingDetail(RD_VueID, RD_RCID, RD_direccion) {
  const pool = await db.getPool();
  const query = 'INSERT INTO ReservaDetalles (RD_VueID,RD_RCID,RD_direccion) VALUES (?,?,?)';
  const [result] = await pool.execute(query, [RD_VueID, RD_RCID, RD_direccion]);
  verifyMysqlWrite(result);

  return result.insertId;
}

module.exports = { createBookingDetail };
