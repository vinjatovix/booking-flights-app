'use strict';

const bcrypt = require('bcryptjs');
const { registerSchema } = require('../../repositories/schemas/registerSchema');
const jwt = require('jsonwebtoken');

const { sendEmail } = require('./sendEmail');
const userRepository = require('../../repositories/user/user-repository');

/**
 * Controlador del registro de usuario.
 * Validamos el contenido del body con Joi.
 * Verificamos que no esxiste ese mail en la base.
 * Mandamos un email de confirmación
 * Encroptamos la contraseña.
 * Insertamos el usuario en la base y devolvemos el Id del registro creado
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function postSignIn(req, res, next) {
  try {
    //? Validamos el Body
    if (!req.body.repeatPassword) {
      const error = new Error();
      error.code = 418;
      error.details = 'Eso que intentas es muy raro';
      next(error);
    }
    await registerSchema.validateAsync(req.body);
    const { username, email, password, bio } = req.body;

    //? Buscamos si ya existe ese usuario
    const [user] = await userRepository.getUserByEmail(email);
    if (user) {
      const error = new Error();
      error.ok = false;
      error.code = 400;
      error.details = 'Ese mail ya está en uso';
      throw error;
    }
    //? Encriptamos la contraseña y guardamos el usuario en la base
    const passwordHash = await bcrypt.hash(password, 12);
    const id = (await userRepository.createUser([username, email, passwordHash, bio])).insertId;

    //? Generamos el mail de registro
    const mail = {
      email,
      subject: 'FLanders User Sign In',
      text: `Saludos ${username}:
      Tu email ${email} ha sido registrado en Flight Landers.`,
      html: `<H1>Saludos ${username}:</H1>
      <p>Tu email ${email} ha sido registrado en Flight Landers.</p>
      <p>Por favor <a href='http://${process.env.BENDER_HOST}:${process.env.BENDER_PORT}/login'> Accede </a> Para activar tu cuenta.</p>`,
    };
    sendEmail(mail, next);
    const tokenPayload = {
      id,
      username,
      email,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '60s' });
    res.status(201).json({ ok: true, token, tokenPayload });
  } catch (err) {
    next(err);
  }
}

module.exports = { postSignIn };
