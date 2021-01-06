'use strict';

const fs = require('fs').promises;
const path = require('path');
const { fileExists } = require('../utils/utils-controller');

/**
 * Returns the path to store the pictures, if if not exists creates a new one
 *
 * @return {String}
 */
async function getStorePath() {
  const storePath = path.join(__dirname, '/../../assets/avatars/');
  if (!(await fileExists(storePath))) {
    await fs.mkdir(storePath, {
      recursive: true,
    });
  }
  return storePath;
}

module.exports = { getStorePath };
