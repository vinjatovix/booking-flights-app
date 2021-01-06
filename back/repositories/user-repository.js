'use strict';

const db = require('../infraestructure/database');

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

/**
 * Actualiza los datos de usuario en la base de datos
 *
 * @param {*} arr [username,bio,photo, id]
 */
async function updateData(arr) {
  const pool = await db.getPool();
  const query = 'UPDATE Usuarios SET Usr_nombre = ?, Usr_bio = ?, Usr_foto = ? WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, arr);
  
  return result;
}

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

async function storeAvatar(arr) {
  const pool = await db.getPool();
  const query = 'UPDATE Usuarios SET Usr_foto = ? WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, arr);

  
  return result;
}

async function changeStatus(arr) {
  const pool = await db.getPool();
  const query = 'UPDATE Usuarios SET Usr_status = ? WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, arr);


  return result;
}
module.exports = { getUserByEmail, createUser, updateData, updatePass, storeAvatar, getAvatar, changeStatus };
