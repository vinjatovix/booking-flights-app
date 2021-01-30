'use strict';

const bcrypt = require('bcryptjs');
const { registerSchema } = require('../../repositories/registerSchema');
const { sendEmail } = require('./sendEmail');
const userRepository = require('../../repositories/user-repository');

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
      error.details = "You are trying to do something not allowed... and i'm a teapot";
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
      error.details = 'That mail is already in use';
      throw error;
    }
    //? Encriptamos la contraseña y guardamos el usuario en la base
    const passwordHash = await bcrypt.hash(password, 12);
    const id = (await userRepository.createUser([username, email, passwordHash, bio])).insertId;

    //? Generamos el mail de registro
    const mail = {
      email,
      subject: 'FLanders User Sign In',
      text: `Greetings ${username}:
      Your mail ${email} has been registered into the Fligh Landers service.`,
      html: `<H1>Greetings ${username}:</H1>
      <p>Your mail ${email} has been registered into the Fligh Landers service.</p>
      <p>Please <a href='http://${process.env.BENDER_HOST}:${process.env.BENDER_PORT}/login'> Log In </a> to activate your account.</p>`,
    };
    sendEmail(mail, next);

    res.status(201).json({ ok: true, user: { id, username, email } });
  } catch (err) {
    next(err);
  }
}

module.exports = { postSignIn };
