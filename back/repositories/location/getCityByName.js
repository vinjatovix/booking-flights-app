'use strict';
const db = require('../../infraestructure/database');

//? CITIES
/**
 * Returns MySQL fields for the given city, 
 * May return empty arrays
 *
 * @param {String} cityName
 * @return {Array}
 */

async function getCityByName(cityName) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Localidades WHERE Loca_nombre = ?';
  const [result] = await pool.execute(query, [cityName]);

  return result;
}
module.exports = { getCityByName };
