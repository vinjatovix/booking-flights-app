'use strict';

const db = require('../../infraestructure/database');

/**
 * Returns the Country fields in DB for the matching iso2 code
 *
 * @param {String} iso2 "Uppercase 2 Chars string"
 * @return {Array} "My SQL row"
 */
const getCountryByCode = async (iso2) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Paises WHERE Pais_iso2 = ?';
  const [result] = await pool.execute(query, [iso2]);

  return result;
};

module.exports = { getCountryByCode };
