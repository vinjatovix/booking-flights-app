'use strict';

const path = require('path');
const jwt = require('jsonwebtoken');
const { getBookings } = require('../../repositories/booking/booking-repository');

/**
 *  Enters a string a returns a formatted booking object key
 * @param {Object} req {auth, body}
 * @param {Object} res
 * @param {*} next
 *
 */
async function userBookings(req, res, next) {
  try {
    //? Recuperamos los datos del usuario de su token
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    // Hacemos una consulta a la DB y recuperamos los datos de su reserva
    const result = await getBookings(decoded.id);
    console.log(result);

    if (result.length === 0) {
      const error = new Error();
      error.code = 400;
      error.details = 'User doesnt have active bookings';
      throw error;
    }

    res.send('Aquí acaba');
  } catch (error) {
    // TODO: Si algo falla que borre todo lo escrito en la base de esta operacion

    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { userBookings };
