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
  const amadeusToken = await getToken(next);
  const response = await fetch(url, {
    method: 'get',
    headers: { authorization: 'Bearer ' + amadeusToken },
  }).then((res) => res.json());

  if (response.errors) {
    const error = new Error(response.errors[0].detail);
    error.code = response.errors[0].status;
    throw error;
  }
  return response;
}
module.exports = { fetchAmadeus };
