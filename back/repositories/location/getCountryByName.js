'use strict';

const db = require('../../infraestructure/database');

const getCountryByName = async (countryName) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Paises WHERE Pais_nombre = ?';
  const [result] = await pool.execute(query, [countryName]);

  return result;
};

module.exports = { getCountryByName };
