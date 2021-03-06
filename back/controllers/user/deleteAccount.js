'use strict';

const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/user/user-repository');

async function deleteAccount({ headers }, res, next) {
  try {
    const token = headers.authorization;
    const decoded = jwt.decode(token);

    if (decoded.status === 'a') {
      await userRepository.changeStatus(['e', decoded.id]);
    }

    if (token) {
      res.send({ ok: true, details: 'Cuenta eliminada' });
      res.redirect('/login');
    } else {
      throw new Error();
    }
  } catch (err) {
    err.details = 'Ha ocurrido algo raro';
    next(err);
  }
}

module.exports = { deleteAccount };
