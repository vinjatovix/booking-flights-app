'use strict';

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
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        '<p>Username: <input type="text" name="username" id="username" placeholder="User name" required /></p>' +
        '<p>Email: <input type="email" name="email" id="email" placeholder="Email" required /></p>' +
        '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
        '<p>Repeat Password: <input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repeat password" required /></p>' +
        '<p>Bio: <input type="text" name="bio" id="bio" placeholder="Short bio"  /></p>' +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}

/**
 * ? Devuelve el formulario de acceso
 *
 * @param {*} req
 * @param {*} res
 */
function getLogIn(req, res) {
  res
    .status(200)
    .send(
      '<form method="post" action="/login" enctype="multipart/form-data">' +
        '<p>Email: <input type="email" name="email" id="email" placeholder="Email" required /></p>' +
        '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}
module.exports = { showAbout, showLanding, getSignIn, getLogIn };
