'use strict';

const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/user-repository');

/**
 *? Funcionalidad que permite eliminar la cuenta de usuario.
 *
 *
 * @param {*} req
 * @param {*} res
 */
async function deleteAccount(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    if (decoded.status === 'a') {
      await userRepository.changeStatus(['e', decoded.id]);
    }

    if (token) {
      res.redirect('/login');
    } else throw new Error();
  } catch (err) {
    err.details = 'Ha ocurrido algo raro';
    next(err);
  }
}

module.exports = { deleteAccount };
