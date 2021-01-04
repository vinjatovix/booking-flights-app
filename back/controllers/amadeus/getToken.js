'use strict';

const fetch = require('node-fetch');

/**
 * Refreshes the Amadeus token
 *
 * @param {*} next
 * @return {String} "Amadeus Token" 
 */
async function getToken(next) {
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const client_id = process.env.AMADEUS_API_KEY;
  const client_secret = process.env.AMADEUS_SECRET;

  const urlencoded = new URLSearchParams();
  urlencoded.append('client_id', client_id);
  urlencoded.append('client_secret', client_secret);
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    body: urlencoded,
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions).then((res) => res.json());
    return response.access_token;
  } catch (error) {
    next(error);
  }
}

module.exports = { getToken };
