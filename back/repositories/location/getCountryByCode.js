'use strict';

const db = require('../../infraestructure/database');

const getCountryByCode = async (iso2) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Paises WHERE Pais_iso2 = ?';
  const [result] = await pool.execute(query, [iso2]);

  return result;
};

module.exports = { getCountryByCode };
