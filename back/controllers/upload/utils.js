'use strict';
const fs = require('fs').promises;
const FileType = require('file-type');
const readChunk = require('read-chunk');

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

/**
 *  Extracts a chunk of a file to validate some data
 *
 * @param {Object} req
 * @return {Object}
 */
async function createFileChunk(req) {
  const tmpFile = req.files.archivo.tempFilePath;
  const buffer = readChunk.sync(tmpFile, 0, 4100);
  const fileBuffer = await FileType.fromBuffer(buffer);
  return fileBuffer;
}

/**
 * Limits File Max Size on Mb
 *
 * @param {*} archivo
 * @param {*} size
 */
function fileMaxSize(archivo, size) {
  if (archivo.size > size * 1000000) {
    const error = new Error();
    error.code = 400;
    error.details = 'File size is too large, image size must be less than 5mb.';
    throw error;
  }
  return true;
}

/**
 * Verifies Corrupted Files
 *
 * @param {*} archivo
 * @param {*} size
 */
function fileMinSize(archivo, size) {
  if (archivo.size <= size) {
    const error = new Error();
    error.code = 400;
    error.details = 'File is empty or corrupted';
    throw error;
  }
  return true;
}

/**
 *  Compares a String with an array of valid extension
 *
 * @param {String} tipo
 * @param {Array} validExtensions
 */
function validateExtension(tipo, validExtensions) {
  if (!tipo || tipo.length === 0 || !validExtensions.includes(tipo.ext)) {
    const error = new Error();
    error.code = 400;
    error.details = 'That file is not valid...';
    throw error;
  }
  return true;
}

module.exports = { fileExists, deleteFile, fileMinSize, fileMaxSize, validateExtension, createFileChunk };
