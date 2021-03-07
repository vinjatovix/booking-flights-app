'use strict';

function e404(req, res, next) {
  const err = new Error();
  err.ok = false;
  err.code = 404;
  err.details = `${req.originalUrl} Not found`;
  next(err);
}
module.exports = { e404 };
