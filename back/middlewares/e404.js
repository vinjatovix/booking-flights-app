'use strict';

/**
 * Constrol de rutas no declaradas
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function e404(req, res, next) {
  console.log('entra!');
  const err = new Error();
  err.ok = false;
  err.code = 404;
  err.details = `${req.originalUrl} Not found`;
  next(err);
}
module.exports = { e404 };
