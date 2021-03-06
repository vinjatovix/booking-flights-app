'use strict';

const { deleteOldAvatar } = require('./deleteOldAvatar');
const fs = require('fs').promises;
const { generatePayload } = require('../user/generatePayload');
const { getStorePath } = require('./getStorePath');
const { getAvatar, getUserByEmail } = require('../../repositories/user/user-repository');
const { imposibleError } = require('./imposibleError');
const jwt = require('jsonwebtoken');
const { newAvatarData } = require('./newAvatarData');
const path = require('path');
const sharp = require('sharp');
const { storePathInDb } = require('./storePahInDb');
const { validateImage } = require('./validateImage');

async function uploadAvatar(req, res, next) {
  try {
    const { id, email } = jwt.decode(req.headers.authorization);

    const file = await validateImage(req, next);
    const storePath = await getStorePath();

    const [oldAvatar] = await getAvatar(id);
    const oldPath = path.join(storePath, oldAvatar.Usr_foto);

    const { uploadPath, fileName } = await newAvatarData(file, id);

    await file.mv(uploadPath, imposibleError());
    const content = await fs.readFile(uploadPath);
    const sharpedFile = await sharp(content).resize(200, 200);
    await sharpedFile.toFile(uploadPath);

    await deleteOldAvatar(oldPath, next);

    await storePathInDb(fileName, id);
    const [user] = await getUserByEmail(email);
    const tokenPayload = generatePayload(user);
    const newToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ ok: true, details: 'Foto subida.', token: newToken });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadAvatar };
