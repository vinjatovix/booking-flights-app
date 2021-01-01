'use strict';
const path = require('path')
/**
 *? Ruta hacia el about
 *
 * @param {*} req
 * @param {*} res
 */
function showAbout(req, res) {
  res.status(200).send({ message: 'This is about page' });
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
    // .status(200)
    // .send(
    //   '<form method="post" action="/login" enctype="multipart/form-data">' +
    //     '<p>Email: <input type="email" name="email" id="email" placeholder="Email" required /></p>' +
    //     '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
    //     '<p><input type="submit" value="Send" /></p>' +
    //     '</form>'
    // );
// }
module.exports = { showAbout, showLanding, getSignIn, getLogIn };
