'use strict';

const Joi = require('joi');
const userRepository = require('../../repositories/user-repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Controlador del acceso de usuario. Validamos el contenido del body con Joi.
 * Recogemos la info relativa a ese mail si estuviese registrado
 * Comparamos la contraseña encriptada.
 * Generamos el token.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function postLogIn(req, res, next) {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await loginSchema.validateAsync(req.body);

    const { email, password } = req.body;
    const [user] = await userRepository.getUserByEmail(email);
    const valid = await bcrypt.compare(password, user.Usr_password);

    if (!user || user.length === 0 || !valid) {
      const error = new Error('Invalid credentials, please try again');
      error.code = 401;
      throw error;
    }

    const tokenPayload = {
      id: user.Usr_ID,
      name: user.Usr_nombre,
      mail: user.Usr_mail,
      password: user.Usr_password,
      photo: user.Usr_foto,
      bio: user.Usr_bio,
      status: user.Usr_status,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).send({ token });
  } catch (err) {
    next(err);
  } finally {
    // TODO: close connection
  }
}

module.exports = { postLogIn };
