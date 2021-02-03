'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    if (!req.headers.authorization || req.headers.authorization === 'null') {
      throw new Error();
    }

    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.auth = decodedToken;
    next();
  } catch (err) {
    err.code = 401;
    err.details = 'Acceso denegado, proporciona credenciales válidas por favor';
    next(err);
  }
}

module.exports = {
  validateAuth,
};
