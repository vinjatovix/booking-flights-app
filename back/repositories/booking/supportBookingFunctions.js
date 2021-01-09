'use strict';

function validAirport(airport) {
  let airportsJSON = require('../infraestructure/airports.json');
  let validation;
  let airports = airportsJSON.airports;
  const airportExist = airports.filter((object) => object.Aero_iata === airport);

  if (airportExist.length > 0) {
    validation = true;
  } else validation = false;
  return validation;
}

function getMiliseconds(date) {
  let splitDate = date.split('-');
  const miliseconds = Date.UTC(splitDate[0], splitDate[1], splitDate[2], 0, 0, 0);
  return miliseconds;
}

module.exports = { validAirport, getMiliseconds };
