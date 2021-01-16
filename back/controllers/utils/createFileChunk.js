'use strict';

const FileType = require('file-type');
const readChunk = require('read-chunk');

/**
 *  Extracts a chunk of a file to validate some data
 *
 * @param {Object} req
 * @return {Object}
 */

async function createFileChunk(file) {
  const tmpFile = file.tempFilePath;
  const buffer = readChunk.sync(tmpFile, 0, 4100);
  const fileBuffer = await FileType.fromBuffer(buffer);
  return fileBuffer;
}

module.exports = { createFileChunk };
