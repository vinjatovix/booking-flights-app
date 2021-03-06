'use strict';

function getUpdatePass(req, res) {
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        '<p>Password: <input type="password" name="password" id="password" placeholder="Password" required /></p>' +
        '<p>New Password: <input type="password" name="newPassword" id="newPassword" placeholder="New password" required /></p>' +
        '<p>Repeat New Password: <input type="password" name="repeatNewPassword" id="repeatNewPassword" placeholder="Repeat New password" required /></p>' +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}
module.exports = { getUpdatePass };
