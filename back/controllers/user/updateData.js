'use strict';

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const userRepository = require('../../repositories/user-repository');

/**
 *? Ruta hacia la update page. Recuperamos la información guardada en la DB a través del payload del token del usuario y se la devolvemos en los inputs del formulario para que se pueda actualizar
 *
 * @param {*} req
 * @param {*} res
 */
function getUpdateData(req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        `<p>Username: <input type="text" name="username" id="username" value=${decoded.name} placeholder="Username" required /></p>` +
        `<p>Avatar: <input type="file" name="avatar" value=${decoded.photo} /></p>` +
        `<p>Bio: <input type="text" name="bio" id="bio" value=${decoded.bio}placeholder="Short bio"  /></p>` +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}

/**
 *? Actualizador de los datos del usuario. Validamos el contenido del body con Joi.
 *Recuperamos la info del usuario a través del payload de su token y recopilamos la info nueva del body.
 * Hacemos una consulta actualizando la DB con los nuevos valores.
 *
 * @param {*} req
 * @param {*} res
 */
async function postUpdateData(req, res, next) {
  try {
    const updateSchema = Joi.object({
      username: Joi.string().min(5).max(100).required(),
      bio: Joi.string().max(255).allow(''),
      photo: Joi.string().allow(''),
    });
    await updateSchema.validateAsync(req.body);

    const { username, bio, photo } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    await userRepository.updateData([username, bio, photo, decoded.id]);

    res.send({ Estado: 'Perfil actualizado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUpdateData, postUpdateData };
