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

/**
 * Esta función recibe un path y elimina un arhcivo del disco duro

 *
 * @param {*} path
 */
async function deleteFile(path) {
  try {
    await fs.unlink(path);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { fileExists, deleteFile };
