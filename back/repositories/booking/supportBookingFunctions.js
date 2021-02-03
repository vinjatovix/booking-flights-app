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



module.exports = { validAirport };
