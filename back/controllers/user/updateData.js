'use strict';

const jwt = require('jsonwebtoken');
const { updateData } = require('../../repositories/user/user-repository');
const { updateProfileSchema } = require('../../repositories/schemas/updateProfileSchema');

/**
 *? Ruta hacia la update page.
 * Recuperamos la información guardada en la DB a través del payload del token del usuario y se la devolvemos en los inputs del formulario para que se pueda actualizar
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
        `<p>Username: <input type="text" name="username" id="username" value=${decoded.username} placeholder="Username" required /></p>` +
        `<p>Avatar: <input type="file" name="avatar" value=${decoded.photo} /></p>` +
        `<p>Bio: <input type="text" name="bio" id="bio" value='${decoded.bio}' placeholder="Short bio"  /></p>` +
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
    await updateProfileSchema.validateAsync(req.body);

    const { username, bio, photo } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    await updateData([username, bio, photo, decoded.id]);

    res.send({ ok: true, detail: 'Perfil actualizado', user: { username, bio, photo } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUpdateData, postUpdateData };
