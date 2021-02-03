'use strict';

const fetch = require('node-fetch');
const { getToken } = require('./getToken');

/**
 * This is the conection with amadeus
 *
 * @param {String} url "Any valid Amadeus API url"
 * @param {*} next
 * @return {Object} "Amadeus response"
 */
async function fetchAmadeus(url, next) {
  
  const amadeusToken = await getToken(next); //? First we must refresh Amadeus token

  const amadeusResponse = await fetch(url, {
    method: 'get',
    headers: { authorization: 'Bearer ' + amadeusToken },
  }).then((res) => res.json());

  if (amadeusResponse.errors) {
    const error = new Error();
    error.code = amadeusResponse.errors[0].status || 500;
    error.details = amadeusResponse.errors[0].detail;
    next(error);
  }

  return amadeusResponse;
}
module.exports = { fetchAmadeus };
