'use strict';
const db = require('../../infraestructure/database');

async function getCityByName(cityName) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Localidades WHERE Loca_nombre = ?';
  const [result] = await pool.execute(query, [cityName]);

  return result;
}
module.exports = { getCityByName };
