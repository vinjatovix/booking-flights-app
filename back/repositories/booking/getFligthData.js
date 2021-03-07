'use strict';
const db = require('../../infraestructure/database');

async function getFligthData(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Vuelos WHERE Vue_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getFligthData };
