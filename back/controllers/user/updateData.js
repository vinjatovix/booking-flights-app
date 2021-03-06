'use strict';

const jwt = require('jsonwebtoken');
const { updateData } = require('../../repositories/user/user-repository');
const { updateProfileSchema } = require('../../repositories/schemas/updateProfileSchema');
const { getUserByEmail } = require('../../repositories/user/getUserByEmail');
const { generatePayload } = require('./generatePayload');

function getUpdateData(req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  res
    .status(200)
    .send(
      '<form method="post" action="/signin" enctype="multipart/form-data">' +
        `<p>Username: <input type="text" name="username" id="username" value=${decoded.username} placeholder="Username" required /></p>` +
        `<p>Bio: <input type="text" name="bio" id="bio" value='${decoded.bio}' placeholder="Short bio"  /></p>` +
        '<p><input type="submit" value="Send" /></p>' +
        '</form>'
    );
}

async function postUpdateData(req, res, next) {
  try {
    await updateProfileSchema.validateAsync(req.body);

    const { username, bio } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    await updateData([username, bio, decoded.id]);
    const [user] = await getUserByEmail(decoded.email);
    const tokenPayload = generatePayload(user);

    const newToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.send({ ok: true, detail: 'Perfil actualizado', newToken: newToken, user: { username, bio } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUpdateData, postUpdateData };
