'use strict';

const db = require('../../infraestructure/database');

/**
 * Muestra el historial de reservas de cabecera del usuario
 *
 * @param {*} number (id)
 */
async function getBookings(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM ReservaCabeceras WHERE RC_UsrID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

/**
 * Muestra el historial de reservas de detalle del usuario
 *
 * @param {*} number (id)
 */
async function getBookingDetail(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM ReservaDetalles WHERE RD_RCID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

/**
 * Muestra los datos de los vuelos según la reserva en detalle
 *
 * @param {*} arr (Id_Vuelo1, Id_Vuelo2)
 */
async function getFligthData(arr) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Vuelos WHERE Vue_ID = ? OR Vue_ID = ?';
  const [result] = await pool.execute(query, arr);
  return result;
}

/**
 * Muestra el nombre del aeropuerto de origen o destino del vuelo según su id
 *
 * @param {*} number (id)
 */
async function getAirport(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Aeropuertos WHERE Aero_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

/**
 * Muestra el nombre de la compañía de cada vuelo según su id
 *
 * @param {*} number (id)
 */
async function getCompany(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Companias WHERE Cmp_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}

module.exports = { getBookings, getBookingDetail, getFligthData, getAirport, getCompany };
