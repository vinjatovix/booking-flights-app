'use strict';
const db = require('../../infraestructure/database');

/**
 * Muestra el nombre de la localidad de origen o destino del aeropuerto según su id
 *
 * @param {*} number (id)
 */

async function getTown(id) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Localidades WHERE Loca_ID = ?';
  const [result] = await pool.execute(query, [id]);
  return result;
}
module.exports = { getTown };
