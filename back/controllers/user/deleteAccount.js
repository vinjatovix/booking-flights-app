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
    } else throw new Error('Something weird happened ');
  } catch (err) {
    next(err);
  }
}

module.exports = { deleteAccount };
