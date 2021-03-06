'use strict';
const db = require('../../infraestructure/database');

async function createUser(arr) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Usuarios (Usr_nombre, Usr_email, Usr_password,Usr_bio) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(query, arr);

  return result;
}

module.exports = { createUser };
