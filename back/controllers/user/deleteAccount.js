'use strict';

const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/user/user-repository');

/**
 *? Funcionalidad que permite eliminar la cuenta de usuario.
 *
 *
 * @param {*} req
 * @param {*} res
 */
async function deleteAccount({ headers }, res, next) {
  try {
    const token = headers.authorization;
    const decoded = jwt.decode(token);

    if (decoded.status === 'a') {
      await userRepository.changeStatus(['e', decoded.id]);
    }

    if (token) {
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
