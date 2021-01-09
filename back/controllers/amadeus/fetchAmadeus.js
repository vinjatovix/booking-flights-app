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
  //? primero hay que refrescar el token de Amadeus
  const amadeusToken = await getToken(next);
  const amadeusOptions = {
    method: 'get',
    headers: { authorization: 'Bearer ' + amadeusToken },
  };

  //? Se hace la pregunta a la API
  const amadeusResponse = await fetch(url, amadeusOptions).then((res) => res.json());

  //? En caso de error se prepara un paquete para el middleware
  if (amadeusResponse.errors) {
    const error = new Error();
    error.code = amadeusResponse.errors[0].status || 500;
    error.details = amadeusResponse.errors[0].detail;
    next(error);
  }

  //? Respuesta
  return amadeusResponse;
}
module.exports = { fetchAmadeus };
