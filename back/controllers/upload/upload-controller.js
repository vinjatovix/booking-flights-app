'use strict';

const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/user-repository');
const { validateImage } = require('./validateImage');
const { fileExists, deleteFile } = require('./utils');

/**
 * Método para cargar imágenes de perfil.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function uploadAvatar(req, res, next) {
  try {
    const { id } = jwt.decode(req.headers.authorization);

    //? Validamos que el tipo de archivo sea segun especificaciones
    const archivo = await validateImage(req, next);

    //? si no existe el directorio de almacenamiento lo creamos
    const storePath = path.join(__dirname, '/../../assets/avatars/');
    if (!(await fileExists(storePath))) {
      await fs.mkdir(storePath, {
        recursive: true,
      });
    }

    //? Si Existe una foto anterior la borramos
    const [oldAvatar] = await userRepository.getAvatar(id);
    const oldPath = path.join(storePath, oldAvatar.Usr_foto);
    if ((await fileExists(oldPath)) && !(await deleteFile(oldPath))) {
      const error = new Error('Something weird happened. Data may be lost, please try again.');
      error.code = 500;
      throw error;
    }

    //? Creamos los datos relativos al usuario, path,nombre de archivo...
    const extension = archivo.name.split('.')[1];
    //! le añado los milisegundos para evitar errores de chache que digan que la foto ya existe y para que no se pueda acceder a la foto simplemente sabiendo el id del usuario
    const fileName = `${id}-${Date.now()}.${extension}`;
    const uploadPath = path.join(__dirname, '/../../assets/avatars/', fileName);

    //? subimos el archivo a su directorio en el Back End
    await archivo.mv(uploadPath, (error) => {
      if (error) {
        throw error; //TODO: EN CASO DE QUE NO EXISTIESE EL DIRECTORIO NO CONSIGO ENVIAR ESTE ERROR AL MIDDLEWARE Y QUE NO ENVIE LA RESPUESTA SIGUIENTE ------> HELP!!
      }
    });

    //? almacenamos la ruta en la BBDD
    /* // TODO: Tengo mis dudas acerca de que debemos guardar en realidad. si guardamos toda la ruta y luego modificamos la ubicacion por lo que sea, hay que modificar todos los registros de la base, pero si solo guardamos el nombre de archivo el resto de la ruta siempre queda en la logica del servidor.
    const pathToStore = uploadPath.split('/').splice(8).join('/'); 
    */

    const storePathInDb = await userRepository.storeAvatar([fileName, id]);
    if (!storePathInDb) {
      const error = new Error('Something weird happened writting in DB, data may be lost. Please try again');
      error.code = 500;
      throw error;
    }

    res.status(200).json({ ok: true, message: 'file upload successful' });
  } catch (error) {
    deleteFile(req.files.archivo.tempFilePath); //? en caso de error, eliminamos el archivo subido para que no quede basura
    next(error);
  }
}

module.exports = { uploadAvatar };
