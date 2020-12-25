'use strict';

const userRepository = require('../../repositories/user-repository');
const bcrypt = require('bcryptjs');
const { registerSchema } = require('../../repositories/registerSchema');

/**
 * Controlador del registro de usuario.
 * Validamos el contenido del body con Joi.
 * Verificamos que no esxiste ese mail en la base.
 * Encroptamos la contraseña.
 * Insertamos el usuario en la base y devolvemos el Id del registro creado
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function postSignIn(req, res, next) {
  try {
    await registerSchema.validateAsync(req.body);
    const { username, email, password, avatar, bio } = req.body;

    const [user] = await userRepository.getUserByEmail(email);
    if (user) {
      const error = new Error('Sorry that mail is already in use');
      error.code = 400;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = (await userRepository.createUser([username, email, passwordHash, avatar, bio])).insertId;
    console.log(id);
    res.status(200).send({ userId: id });
  } catch (err) {
    next(err);
  }
}

module.exports = { postSignIn };
