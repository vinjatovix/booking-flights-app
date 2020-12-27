'use strict';

/**
 *? Ruta hacia la update page
 *
 * @param {*} req
 * @param {*} res
 */
function getUpdateData(req, res) {
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        '<p>Avatar: <input type="file" name="avatar" /></p>' +
        '<p>Bio: <input type="text" name="bio" id="bio" placeholder="Short bio"  /></p>' +
        '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
        '<p>New Password: <input type="password" name="newPassword" id="newPassword" placeholder="New password" required /></p>' +
        '<p>Repeat New Password: <input type="password" name="repeatNewPassword" id="repeatNewPassword" placeholder="Repeat New password" required /></p>' +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}

module.exports = { getUpdateData };
