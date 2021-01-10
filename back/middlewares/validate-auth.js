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
    err.details = 'Access denied. Please, log in with valid credentials.';
    next(err);
  }
}

module.exports = {
  validateAuth,
};
