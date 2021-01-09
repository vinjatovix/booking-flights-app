'use strict';
const db = require('../../infraestructure/database');

/**
 * Inserts city data in MySQL DB
 *
 * @param {Array} cityData [Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud]
 * @return {Array}
 */
async function createCity(cityData, next) {
  try {
    const pool = await db.getPool();
    const query = 'INSERT INTO Localidades (Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud) VALUES(?,?,?,?)';
    const [result] = await pool.execute(query, cityData);
    return result.insertId;
  } catch (error) {
    error.code = isNaN(error.code) ? 503 : error.code;
    next(error);
  }
}
module.exports = { createCity };
