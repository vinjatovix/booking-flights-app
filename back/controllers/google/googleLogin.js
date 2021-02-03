'use strict';
  
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const userRepository = require('../../repositories/user/user-repository');
const { storePathInDb } = require('../upload/storePahInDb');

const { registerSchema } = require('../../repositories/schemas/registerSchema');
const bcrypt = require('bcryptjs');


// const jwt = require('jsonwebtoken');

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    nombre: payload.name,
    email: payload.email,
    foto: payload.picture, // todo
  };
}

async function googleLogin(req, res, next) {
  try {
    //TODO REFACTORIZAR ESTO !!!
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
      const id = (await userRepository.createUser([data.username, data.email, passwordHash, data.bio])).insertId;
      await storePathInDb(data.avatar, id);
      const tokenPayload = {
        id,
        email,
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
      return res.send({ token });
    }
    const tokenPayload = {
      id: user.Usr_ID,
      mail: user.Usr_mail,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.send({ token });
  } catch (err) {
    err.code = 403;
    err.ok = false;
    next(err);
  }
}

module.exports = { googleLogin };
