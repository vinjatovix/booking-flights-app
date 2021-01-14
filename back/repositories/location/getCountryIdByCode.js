'use strict';

const db = require('../../infraestructure/database');

async function getCountryIdByCode(iso2) {
  const pool = await db.getPool();
  const query = 'SELECT Pais_ID FROM Paises WHERE Pais_iso2 = ?';
  const [result] = await pool.execute(query, [iso2]);
  return result;
}
module.exports = { getCountryIdByCode };
