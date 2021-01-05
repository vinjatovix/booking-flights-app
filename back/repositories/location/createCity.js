'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');

/**
 * Inserts city data in MySQL DB
 *
 * @param {Array} cityData [Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud]
 * @return {Array}
 */
async function createCity(cityData) {
  const pool = await db.getPool();
  const query = 'INSERT INTO Localidades (Loca_nombre, Loca_PaisID, Loca_latitud, Loca_longitud) VALUES(?,?,?,?)';
  const [result] = await pool.execute(query, cityData);
  //? En caso de error no podemos continuar
  verifyMysqlWrite(result);
  return result.insertId;
}
module.exports = { createCity };
