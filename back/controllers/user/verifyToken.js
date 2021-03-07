'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization || req.headers.authorization === 'null' || req.headers.authorization.length === 0) {
      throw new Error();
    }
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);

    res.status(200).send({
      ok: true,
      decodedToken,
    });
  } catch (err) {
    err.code = 401;
    err.details = 'Sesión caducada, haz log in otra vez';
    next(err);
  }
}
module.exports = { verifyToken };
