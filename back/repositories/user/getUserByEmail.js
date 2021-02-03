'use strict';
const db = require('../../infraestructure/database');

/**
 * Devuelve el usuario de la base al que corresponde el email si lo hubiese
 *
 * @param {*} email
 */

async function getUserByEmail(email) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Usuarios WHERE Usr_email = ?';
  const [result] = await pool.execute(query, [email]);

  return result;
}

module.exports = { getUserByEmail };
