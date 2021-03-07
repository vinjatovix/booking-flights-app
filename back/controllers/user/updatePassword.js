'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, updatePass } = require('../../repositories/user/user-repository');
const { updatePasswordSchema } = require('../../repositories/schemas/updatePasswordSchema');
const { wait } = require('../utils/wait');

async function postUpdatePass({ headers, body }, res, next) {
  try {
    await updatePasswordSchema.validateAsync(body);
    if (!body.repeatNewPassword) {
      const err = new Error();
      err.code = 418;
      err.details = 'Estás intentando hacer algo prohibido. Ojito.';
      next(err);
    }

    const token = headers.authorization;
    const decoded = jwt.decode(token);
    const [user] = await getUserByEmail(decoded.email);
    const { password, newPassword } = body;
    const valid = await bcrypt.compare(password, user.Usr_password);

    if (!valid) {
      const err = new Error();
      err.code = 401;
      err.details = 'Contraseña incorrecta, datos no actualizados.';
      next(err);
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await wait(1000);
    await updatePass([passwordHash, decoded.id]);

    res.send({ ok: true, details: 'Contraseña actualizada' });
  } catch (err) {
    next(err);
  }
}

module.exports = { postUpdatePass };
