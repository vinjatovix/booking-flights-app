'use strict';
const db = require('../../infraestructure/database');

/**
 * Inserts city data in MySQL DB
 *
 * @param {Array} cityData [Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud, Loca_citycode]
 * @return {Array}
 */
async function createCity(cityData) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Localidades (Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud) VALUES(?,?,?,?)';
  const [result] = await pool.execute(query, cityData);

  return result.insertId;
}
module.exports = { createCity };
