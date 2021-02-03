'use strict';
const db = require('../../infraestructure/database');

/**
 * Cambia la contraseña de inicio de sesión
 *
 * @param {*} arr [password, id]
 */
async function updatePass(arr) {
  const pool = await db.getPool();
  const query = 'UPDATE Usuarios SET Usr_password = ? WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, arr);

  return result;
}

module.exports = { updatePass };