'use strict';

const fs = require('fs').promises;

/**
 *Esta función recibe un path y develve un booleano confirmando la existencia de un archivo
 *
 * @param {*} path
 * @return {*}
 */

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { fileExists };
