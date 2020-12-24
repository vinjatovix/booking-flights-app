'use strict';

const db = require('../infraestructure/database');

/**
 * Devuelve el usuario de la base al que corresponde el email si lo hubiese
 *
 * @param {*} email
 */
async function getUserByEmail(email) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Usuarios WHERE Usr_mail = ?';
  const [result] = await pool.execute(query, [email]);

  return result;
}

/**
 * Inserta los datos de usuario en la base de datos
 *
 * @param {*} arr [username,usermail,password,bio]
 */
async function createUser(arr) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Usuarios (Usr_nombre, Usr_mail, Usr_password,Usr_bio) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(query, arr);

  return result;
}

module.exports = { getUserByEmail, createUser };
