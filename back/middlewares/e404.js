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
  const err = new Error('Not Found');
  err.code = 404;
  next(err);
}
module.exports = { e404 };
