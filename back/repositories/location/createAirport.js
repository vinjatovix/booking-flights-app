'use strict';
const db = require('../../infraestructure/database');

/**
 * Stores an airport in MySQL DB and returns his airport Id
 *
 * @param {Array} airportData [Aero_nombre, Aero_iata, Aero_LocaID, Aero_PaisID, Aero_latitud, Aero_longitud]
 * @return {Number}
 */
async function createAirport(airportData, next) {
  try {
    const pool = await db.getPool();
    const query =
      'INSERT INTO Aeropuertos (Aero_nombre, Aero_iata, Aero_LocaID, Aero_PaisID, Aero_latitud, Aero_longitud) VALUES (?,?,?,?,?,?)';
    const [result] = await pool.execute(query, airportData);
    //? Si no se escribe el aeropuerto no podemos continuar
    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 503 : error.code;
    next(error);
  }
}

module.exports = { createAirport };
