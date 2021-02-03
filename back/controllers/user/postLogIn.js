'use strict';

const { generatePayload } = require('./generatePayload');
const { getUserByEmail } = require('../../repositories/user/user-repository');
const { joiLogin } = require('./joiLogin');
const jwt = require('jsonwebtoken');
const { userStatusManager } = require('./userStatusManager');
const { validatePassword } = require('./validatePassword');
const { validateUser } = require('./validateUser');

/**
 * Controlador del acceso de usuario. Validamos el contenido del body con Joi.
 * Recogemos la info relativa a ese mail si estuviese registrado
 * Comparamos la contraseña encriptada.
 * Activamos la cuenta con status = "a" y comprobamos si no está eliminada
 * Generamos el token.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function postLogIn(req, res, next) {
  try {
    await joiLogin(req);
    const { email, password } = req.body;
    const [user] = await getUserByEmail(email);
    validateUser(user);
    await validatePassword(password, user);
    await userStatusManager(user);
    const tokenPayload = generatePayload(user);
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).send({ ok: true, token });
  } catch (err) {
    next(err);
  }
}

module.exports = { postLogIn };
