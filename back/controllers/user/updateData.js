'use strict';

const jwt = require('jsonwebtoken');

/**
 *? Ruta hacia la update page
 *
 * @param {*} req
 * @param {*} res
 */
function getUpdateData(req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        `<p>Username: <input type="text" name="username" id="username" value=${decoded.name} placeholder="User name" required /></p>` +
        `<p>Avatar: <input type="file" name="avatar" value=${decoded.photo} /></p>` +
        `<p>Bio: <input type="text" name="bio" id="bio" value=${decoded.bio}placeholder="Short bio"  /></p>` +
        '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
        '<p>New Password: <input type="password" name="newPassword" id="newPassword" placeholder="New password" required /></p>' +
        '<p>Repeat New Password: <input type="password" name="repeatNewPassword" id="repeatNewPassword" placeholder="Repeat New password" required /></p>' +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}

module.exports = { getUpdateData };
