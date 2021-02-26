'use strict';
const db = require('../../infraestructure/database');

/**
 * Recupera la foto del usuario (Se podria sustiruir con la info del token)
 *
 * @param {*} id
 * @return {*}
 */
async function getAvatar(id) {
  const pool = await db.getPool();
  const query = 'SELECT Usr_foto from Usuarios WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, [id]);

  return result;
}
module.exports = { getAvatar };
