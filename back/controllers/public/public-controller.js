'use strict';
const path = require('path');
/**
 *? Ruta hacia el about
 *
 * @param {*} req
 * @param {*} res
 */
function showAbout(req, res) {
  res.status(200).send({
    ok: true,
    message: 'This is about page',
    year: 2020,
    authors: ['matthewcodesido@gmail.com', 'vinjadevix@gmail.com'],
  });
}

/**
 *? Ruta hacia la landing
 *
 * @param {*} req
 * @param {*} res
 */
function showLanding(req, res) {
  res.status(200).send({
    title: 'LO (&& behold ^^)',
    message: 'Route / is working properly',
  });
}

/**
 * ? Devuelve el formulario de registro
 *
 * @param {*} req
 * @param {*} res
 */
function getSignIn(req, res) {
  res.sendFile(path.join(__dirname, '../../public/signin.html'));
}

/**
 * ? Devuelve el formulario de acceso
 *
 * @param {*} req
 * @param {*} res
 */
function getLogIn(req, res) {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
}

module.exports = { showAbout, showLanding, getSignIn, getLogIn };
