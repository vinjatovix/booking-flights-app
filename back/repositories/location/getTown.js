'use strict';
const db = require('../../infraestructure/database');

async function getTown(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Localidades WHERE Loca_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}
module.exports = { getTown };
