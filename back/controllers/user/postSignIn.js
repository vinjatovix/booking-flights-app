'use strict';

const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../../repositories/user/user-repository');
const jwt = require('jsonwebtoken');
const { registerSchema } = require('../../repositories/schemas/registerSchema');
const { sendEmail } = require('./sendEmail');

async function postSignIn(req, res, next) {
  try {
    if (!req.body.repeatPassword) {
      const error = new Error();
      error.code = 418;
      error.details = 'Eso que intentas es muy raro';
      next(error);
    }

    await registerSchema.validateAsync(req.body);
    const { username, email, password, bio } = req.body;
  
    const [user] = await getUserByEmail(email);
    if (user) {
      const error = new Error();
      error.ok = false;
      error.code = 400;
      error.details = 'Ese mail ya está en uso';
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = (await createUser([username, email, passwordHash, bio])).insertId;

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
      bio,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ ok: true, token, tokenPayload });
  } catch (err) {
    next(err);
  }
}

module.exports = { postSignIn };
