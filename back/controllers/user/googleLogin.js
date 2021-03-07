'use strict';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const userRepository = require('../../repositories/user/user-repository');
const { registerSchema } = require('../../repositories/schemas/registerSchema');
const bcrypt = require('bcryptjs');

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    nombre: payload.name,
    email: payload.email,
    foto: payload.picture,
  };
}

async function googleLogin(req, res, next) {
  try {
    let idtoken = req.body.idtoken;
    let googleUser = await verifyGoogleToken(idtoken);
    let { email } = googleUser;
    const [user] = await userRepository.getUserByEmail(email);

    if (!user || user.length === 0) {
      let data = {
        username: googleUser.nombre,
        email: googleUser.email,
        password: process.env.GOOGLE_PASSWORD,
        repeatPassword: process.env.GOOGLE_PASSWORD,
        avatar: googleUser.foto,
        bio: '',
      };

      await registerSchema.validateAsync(data);
      const passwordHash = await bcrypt.hash(data.password, 12);
      await userRepository.createUser([data.username, data.email, passwordHash, data.avatar, data.bio]);

      res.status(200).send({ ok: true, idtoken });
    }

    res.send({ ok: true, idtoken });
  } catch (err) {
    err.code = 403;
    err.ok = false;
    next(err);
  }
}

module.exports = { googleLogin };
