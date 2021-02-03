'use strict';
const db = require('../../infraestructure/database');

async function changeStatus(arr) {
  const pool = await db.getPool();
  const query = 'UPDATE Usuarios SET Usr_status = ? WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, arr);

  return result;
}
module.exports = { changeStatus };
