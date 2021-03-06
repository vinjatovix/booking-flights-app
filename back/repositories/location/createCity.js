'use strict';
const db = require('../../infraestructure/database');

async function createCity(cityData, next) {
  try {
    const pool = await db.getPool();
    const query = 'INSERT INTO Localidades (Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud) VALUES(?,?,?,?)';
    const [result] = await pool.execute(query, cityData);
    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 503 : error.code;
    error.details = error.message;
    next(error);
  }
}
module.exports = { createCity };
