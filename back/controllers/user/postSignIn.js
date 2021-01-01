'use strict';

const Joi = require('joi');
const userRepository = require('../../repositories/user-repository');
const bcrypt = require('bcryptjs');

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
    const registerSchema = Joi.object({
      username: Joi.string().min(5).max(100).required(),
      email: Joi.string().email().max(200).required(),
      password: Joi.string().min(6).max(30).required(),
      repeatPassword: Joi.ref('password'),
      bio: Joi.string().max(255).allow(''),
    });
    await registerSchema.validateAsync(req.body);
    const { username, email, password, bio } = req.body;

    const [user] = await userRepository.getUserByEmail(email);
    if (user) {
      const error = new Error('Sorry that mail is already in use');
      error.code = 400;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = (await userRepository.createUser([username, email, passwordHash, bio])).insertId;
    res.status(200).send({ userId: id });
  } catch (err) {
    next(err);
  }
}

module.exports = { postSignIn };
