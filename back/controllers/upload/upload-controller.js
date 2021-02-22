'use strict';

const { deleteOldAvatar } = require('./deleteOldAvatar');
const { getStorePath } = require('./getStorePath');
const { getAvatar, getUserByEmail } = require('../../repositories/user/user-repository');
const { imposibleError } = require('./imposibleError');
const jwt = require('jsonwebtoken');
const { newAvatarData } = require('./newAvatarData');
const path = require('path');
const { storePathInDb } = require('./storePahInDb');
const { validateImage } = require('./validateImage');
const { generatePayload } = require('../user/generatePayload');
const sharp = require('sharp');
const fs = require('fs').promises;
/**
 * This method updates the picture profile on the system.
 *
 * @param {Object} req
 * @param {JSON} res
 * @param {*} next
 */
async function uploadAvatar(req, res, next) {
  try {
    const { id, email } = jwt.decode(req.headers.authorization);

    //? Validamos que el tipo de archivo sea según especificaciones
    const file = await validateImage(req, next);
    //? si no existe el directorio de almacenamiento lo creamos
    const storePath = await getStorePath();

    // ? obtenemos Los datos antiguos
    const [oldAvatar] = await getAvatar(id);
    const oldPath = path.join(storePath, oldAvatar.Usr_foto);

    //? Creamos los datos relativos al usuario, path,nombre de archivo...
    const { uploadPath, fileName } = await newAvatarData(file, id);

    // ? subimos el archivo a su directorio en el Back End
    await file.mv(uploadPath, imposibleError());
    const content = await fs.readFile(uploadPath);
    //? y lo procesamos
    const sharpedFile = await sharp(content).resize(200, 200);
    await sharpedFile.toFile(uploadPath);

    //? Si Existe una foto anterior la borramos
    await deleteOldAvatar(oldPath, next);

    /* 
    ? almacenamos la ruta en la BBDD
    ? si guardamos toda la ruta y luego modificamos la ubicación por lo que sea, hay que modificar todos los registros de la base, pero si solo guardamos el nombre de archivo el resto de la ruta siempre queda en la logica del servidor.
    ? const pathToStore = uploadPath.split('/').splice(8).join('/'); 
    */
    await storePathInDb(fileName, id);
    const [user] = await getUserByEmail(email);
    const tokenPayload = generatePayload(user);
    const newToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ ok: true, details: 'Foto subida.', token: newToken });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadAvatar };
