'use strict';

/**
 * Verifies if some data exists
 *
 * @param {Object} req
 * @return {Boolean}
 */
function basicInputDataValidation(req) {
  const { id } = req.auth;
  const { adults, itineraries, price, validatingAirlineCodes } = req.body;

  if (!req.body.adults || req.body.adults <= 0 || req.body.adults >= 10) {
    const error = new Error();
    error.details = 'El número de adultos debe de ser entre 1 y 9';
    error.code = 400;
    throw error;
  }
  if (!id) {
    const error = new Error();
    error.details = 'Se necesita el ID de usuario';
    error.code = 403;
    throw error;
  }
  if (!price || !adults || !validatingAirlineCodes) {
    const error = new Error();
    error.code = 400;
    error.details = 'Los datos de vuelo no son válidos';
    throw error;
  }
  if (!itineraries || itineraries.length === 0) {
    const error = new Error();
    error.code = 400;
    error.details = 'Los datos de intinerario no son válidos';
    throw error;
  }

  return true;
}
module.exports = { basicInputDataValidation };
