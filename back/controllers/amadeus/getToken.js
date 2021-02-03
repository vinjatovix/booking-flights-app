'use strict';

const fetch = require('node-fetch');
const { validateReturn } = require('../utils/validateReturn');
const { makeTokenOptionsBody } = require('./makeTokenOptionsBody');
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

    const urlencoded = makeTokenOptionsBody(client_id, client_secret);

    const tokenOptions = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow',
    };

    //? API CONNECTION
    const response = await fetch(newTokenUrl, tokenOptions).then((res) => res.json());
    validateReturn(response, 'amadeus Token', 400);

    return response.access_token;
  } catch (error) {
    error.code = error.code || 400;
    error.details = error.details || 'Algo ha ido mal con el token de Amadeus';
    next(error);
  }
}

module.exports = { getToken };
