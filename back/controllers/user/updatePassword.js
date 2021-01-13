'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/user-repository');
const { wait } = require('../utils/wait');

/**
 *? Ruta hacia la página de cambio de contraseña.
 *
 *
 * @param {*} req
 * @param {*} res
 */
function getUpdatePass(req, res) {
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
        '<p>New Password: <input type="password" name="newPassword" id="newPassword" placeholder="New password" required /></p>' +
        '<p>Repeat New Password: <input type="password" name="repeatNewPassword" id="repeatNewPassword" placeholder="Repeat New password" required /></p>' +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}

/**
 *? Actualizador de la contraseña.
 * Validamos el contenido del body con Joi.
 * Comprobamos si la contraseña introducida se corresponde con la contraseña encriptada guardada.
 * Sustituimos la contraseña antigua por la nueva, previo encriptado.
 *
 * @param {*} req
 * @param {*} res
 */
async function postUpdatePass(req, res, next) {
  try {
    const updateSchema = Joi.object({
      password: Joi.string().min(6).max(30).required(),
      newPassword: Joi.string().min(6).max(30).required(),
      repeatNewPassword: Joi.ref('newPassword'),
    });
    await updateSchema.validateAsync(req.body);
    if (!req.body.repeatNewPassword) {
      const error = new Error();
      error.code = 418;
      error.details = "You are tying to do something not allowed, and i'm a teapot";
      next(error);
    }

    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const [user] = await userRepository.getUserByEmail(decoded.email);
    const { password, newPassword } = req.body;
    const valid = await bcrypt.compare(password, user.Usr_password);

    if (!valid) {
      const error = new Error();
      (error.ok = false), (error.code = 401);
      error.details = 'Incorrect password. Password not updated.';
      next(error);
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await wait(1000);
    await userRepository.updatePass([passwordHash, decoded.id]);

    res.send({ ok: true, details: 'Password successfully updated.' });
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}

module.exports = { getUpdatePass, postUpdatePass };
