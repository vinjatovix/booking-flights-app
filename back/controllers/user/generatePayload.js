'use strict';
/**
 * Generates payload
 *
 * @param {Object} user
 * @return {Object}
 */
function generatePayload(user) {
  return {
    id: user.Usr_ID,
    username: user.Usr_nombre,
    email: user.Usr_email,
    photo: user.Usr_foto,
    bio: user.Usr_bio,
    status: user.Usr_status,
  };
}
exports.generatePayload = generatePayload;
