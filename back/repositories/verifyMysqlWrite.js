'use strict';

/**
 * Verifies if data was stored in MySQL DB,
 * If no, throws error
 *
 * @param {Array} result
 */
function verifyMysqlWrite(result) {
  if (!result.insertId || result.length === 0) {
    const error = new Error();
    error.details = 'Error escribiendo la base de datos';
    error.code = 500;
    throw error;
  }
}
module.exports = { verifyMysqlWrite };
