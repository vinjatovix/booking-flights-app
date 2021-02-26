'use strict';

const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../../repositories/user/user-repository');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { registerSchema } = require('../../repositories/schemas/registerSchema');
const { storePathInDb } = require('../upload/storePahInDb');
const { generatePayload } = require('../user/generatePayload');

const client = new OAuth2Client(process.env.CLIENT_ID);
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  return {
    nombre: name,
    email: email,
    foto: picture,
  };
}

async function googleLogin(req, res, next) {
  try {
    //TODO REFACTORIZAR ESTO !!!
    const { email, nombre, foto } = await verifyGoogleToken(req.body.idtoken);
    const [user] = await getUserByEmail(email);

    if (!user || user.length === 0) {
      const data = {
        username: nombre,
        email: email,
        password: process.env.GOOGLE_PASSWORD,
        repeatPassword: process.env.GOOGLE_PASSWORD,
        avatar: foto,
        bio: '',
      };
      await registerSchema.validateAsync(data);
      const passwordHash = await bcrypt.hash(data.password, 12);
      const id = (await createUser([data.username, data.email, passwordHash, data.bio])).insertId;
      await storePathInDb(data.avatar, id);
      const tokenPayload = {
        id,
        username: nombre,
        email,
        photo: foto,
        bio: data.bio,
        status: 'a',
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
      return res.send({ token });
    }
    const tokenPayload = generatePayload(user);

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.send({ ok: true, token });
  } catch (err) {
    err.code = 403;
    next(err);
  }
}

module.exports = { googleLogin };
