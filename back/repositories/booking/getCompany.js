'use strict';
const db = require('../../infraestructure/database');

async function getCompany(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Companias WHERE Cmp_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getCompany };
