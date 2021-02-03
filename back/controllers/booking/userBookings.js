'use strict';

const path = require('path');
const jwt = require('jsonwebtoken');
const {
  getBookings,
  // getBookingDetail,
  // getFligthData,
  // getAirport,
  // getCompany,
} = require('../../repositories/booking/booking-repository');
const { createBookingData } = require('./createBookingData');

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
    const RC_bookings = await getBookings(decoded.id);
    // Comprobamos que el usuario tenga alguna reserva hecha
    if (RC_bookings.length === 0) {
      const error = new Error();
      error.code = 400;
      error.details = 'No existen reservas';
      throw error;
    }
    // Creamos los datos de las reservas
    const bookings = await createBookingData(RC_bookings);

    res.send(bookings);
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { userBookings };
