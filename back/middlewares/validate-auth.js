'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    req.auth = decodedToken;
    next();
  } catch (err) {
    const error = new Error('Access denied. Please, log in with valid credentials.');
    next(error);
  }
}

module.exports = {
  validateAuth,
};
