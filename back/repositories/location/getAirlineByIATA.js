'use strict';
const db = require('../../infraestructure/database');

const getAirlineByIATA = async (iata2) => {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Companias WHERE Cmp_iata = ?';
  const [result] = await pool.execute(query, [iata2]);

  return result;
};

module.exports = { getAirlineByIATA };
