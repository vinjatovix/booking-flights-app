'use strict';

const fetch = require('node-fetch');
const { validateReturn } = require('../utils/validateReturn');
/**
 * Refreshes the Amadeus token
 *
 * @param {*} next
 * @return {String} "Amadeus Token"
 */
async function getToken(next) {
  try {
    //? API SETTINGS

    const newTokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const client_id = process.env.AMADEUS_API_KEY;
    const client_secret = process.env.AMADEUS_SECRET;

    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', client_id);
    urlencoded.append('client_secret', client_secret);
    urlencoded.append('grant_type', 'client_credentials');

    const tokenOptions = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow',
    };

    //? API CONNECTION
    const response = await fetch(newTokenUrl, tokenOptions).then((res) => res.json());
    validateReturn(response);
    return response.access_token;
  } catch (error) {
    error.code = error.code || 400;
    error.details = 'Something went wrong with Amadeus token';
    next(error);
  }
}

module.exports = { getToken };
