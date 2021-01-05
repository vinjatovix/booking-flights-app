'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

/**
 * Stores an airport in MySQL DB and returns his airport Id
 *
 * @param {Array} airportData [Aero_nombre, Aero_iata, Aero_LocaID, Aero_PaisID, Aero_latitud, Aero_longitud]
 * @return {Number}
 */
async function createAirport(airportData) {
  const pool = await db.getPool();
  const query =
    'INSERT INTO Aeropuertos (Aero_nombre, Aero_iata, Aero_LocaID, Aero_PaisID, Aero_latitud, Aero_longitud) VALUES (?,?,?,?,?,?)';
  const [result] = await pool.execute(query, airportData);
  //? Si no se escribe el aeropuerto no podemos continuar
  verifyMysqlWrite(result);
  return result.insertId;
}

module.exports = { createAirport };
