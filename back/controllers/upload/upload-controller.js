'use strict';

const { deleteOldAvatar } = require('./deleteOldAvatar');
const { getStorePath } = require('./getStorePath');
const { imposibleError } = require('./imposibleError');
const jwt = require('jsonwebtoken');
const { newAvatarData } = require('./newAvatarData');
const path = require('path');
const { storePathInDb } = require('./storePahInDb');
const userRepository = require('../../repositories/user-repository');
const { validateImage } = require('./validateImage');

/**
 * This method updates the picture profile on the system.
 *
 * @param {Object} req
 * @param {JSON} res
 * @param {*} next
 */
async function uploadAvatar(req, res, next) {
  try {
    const { id } = jwt.decode(req.headers.authorization);

    //? Validamos que el tipo de archivo sea según especificaciones
    const file = await validateImage(req, next);

    //? si no existe el directorio de almacenamiento lo creamos
    const storePath = await getStorePath();

    // ? obtenemos Los datos antiguos
    const [oldAvatar] = await userRepository.getAvatar(id);
    const oldPath = path.join(storePath, oldAvatar.Usr_foto);

    //? Creamos los datos relativos al usuario, path,nombre de archivo...
    const { uploadPath, fileName } = newAvatarData(file, id);

    //? subimos el archivo a su directorio en el Back End
    await file.mv(uploadPath, imposibleError());

    //? Si Existe una foto anterior la borramos
    await deleteOldAvatar(oldPath, next);

    /* 
    TODO: DECIDIR!?!?! 'Something weird happened writting in DB, da'Something weird happened writting in DB, da'Something weird happened writting in DB, da'Something weird happened writting in DB, data may be lost. Please try again'ta may be lost. Please try again'ta may be lost. Please try again'ta may be lost. Please try again'
    ? almacenamos la ruta en la BBDD
    ? si guardamos toda la ruta y luego modificamos la ubicacion por lo que sea, hay que modificar todos los registros de la base, pero si solo guardamos el nombre de archivo el resto de la ruta siempre queda en la logica del servidor.
    ? const pathToStore = uploadPath.split('/').splice(8).join('/'); 
    */
    await storePathInDb(fileName, id);

    res.status(200).json({ ok: true, details: 'File upload successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadAvatar };
