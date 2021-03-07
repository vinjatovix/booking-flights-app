'use strict';

const db = require('../../infraestructure/database');

async function createAirport(airportData, next) {
  try {
    const pool = await db.getPool();
    const query =
      'INSERT INTO Aeropuertos (Aero_nombre, Aero_iata, Aero_LocaID, Aero_PaisID, Aero_latitud, Aero_longitud) VALUES (?,?,?,?,?,?)';
    const [result] = await pool.execute(query, airportData);

    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 503 : error.code;
    error.details = error.message;
    next(error);
  }
}

module.exports = { createAirport };
