'use strict';
const db = require('../../infraestructure/database');

/**
 * Inserta los datos de usuario en la base de datos
 *
 * @param {*} arr [username,usermail,password,avatar,bio]
 */
async function createUser(arr) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Usuarios (Usr_nombre, Usr_email, Usr_password,Usr_bio) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(query, arr);

  return result;
}

module.exports = { createUser };
