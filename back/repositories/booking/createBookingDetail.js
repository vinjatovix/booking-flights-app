'use strict';

const db = require('../../infraestructure/database');

async function createBookingDetail(RD_VueID, RD_RCID, RD_direccion, next) {
  try {
    const pool = await db.getPool();
    const query = 'INSERT INTO ReservaDetalles (RD_VueID,RD_RCID,RD_direccion) VALUES (?,?,?)';
    const [result] = await pool.execute(query, [RD_VueID, RD_RCID, RD_direccion]);

    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 500 : error.code;
    error.details = error.message;
    next(error);
  }
}

module.exports = { createBookingDetail };
