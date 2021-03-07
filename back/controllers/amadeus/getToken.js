'use strict';

const fetch = require('node-fetch');
const { validateReturn } = require('../utils/validateReturn');
const { makeTokenOptionsBody } = require('./makeTokenOptionsBody');

async function getToken(next) {
  try {
    const newTokenUrl = process.env.URL_TOKEN;
    const client_id = process.env.AMADEUS_API_KEY;
    const client_secret = process.env.AMADEUS_SECRET;

    const urlencoded = makeTokenOptionsBody(client_id, client_secret);

    const tokenOptions = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow',
    };

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
