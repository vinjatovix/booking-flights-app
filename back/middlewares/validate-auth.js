'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    if (req.headers.authorization === 'null') {
      const error = new Error();
      error.code = 401;
      error.details = 'No valid token found';
      next(error);
    }
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.auth = decodedToken;
    next();
  } catch (err) {
    const error = new Error();
    err.code = 401;
    err.details = 'Access denied. Please, log in with valid credentials.';
    next(error);
  }
}

module.exports = {
  validateAuth,
};
