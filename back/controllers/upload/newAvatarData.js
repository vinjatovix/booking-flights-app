'use strict';
const path = require('path');

/**
 *  Return an object with an uploadPath and a fileName
 *
 * @param {String} file
 * @param {Number} id
 * @return {Object} 
 */
function newAvatarData(file, id) {
  let extension = file.name.split('.');
  extension = extension[extension.length - 1].toLowerCase();
  //! le añado los milisegundos para evitar errores de chache que digan que la foto ya existe y para que no se pueda acceder a la foto simplemente sabiendo el id del usuario
  const fileName = `${id}-${Date.now()}.${extension}`;
  const uploadPath = path.join(__dirname, '/../../assets/avatars/', fileName);
  return { uploadPath, fileName };
}

module.exports = { newAvatarData };
