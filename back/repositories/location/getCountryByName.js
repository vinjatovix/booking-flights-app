'use strict';
const db = require('../../infraestructure/database');

/**
 * Returns the Country field in MySQL DB for the matching countryName
 *
 * @param {String} countryName
 * @return {Array}
 */
const getCountryByName = async (countryName) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Paises WHERE Pais_nombre = ?';
  const [result] = await pool.execute(query, [countryName]);

  return result;
};

module.exports = { getCountryByName };
