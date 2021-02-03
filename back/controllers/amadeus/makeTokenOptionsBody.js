'use strict';

function makeTokenOptionsBody(client_id, client_secret) {
  const urlencoded = new URLSearchParams();
  urlencoded.append('client_id', client_id);
  urlencoded.append('client_secret', client_secret);
  urlencoded.append('grant_type', 'client_credentials');
  return urlencoded;
}
exports.makeTokenOptionsBody = makeTokenOptionsBody;
