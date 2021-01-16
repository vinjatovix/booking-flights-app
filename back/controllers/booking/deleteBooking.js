'use strict';

const jwt = require('jsonwebtoken');
const path = require('path');
const { getBookings, cancelBooking } = require('../../repositories/booking/booking-repository');

/**
 * Stores a new booking on the system
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteBooking(req, res, next) {
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
      error.details = 'User doesnt have active bookings';
      throw error;
    }
    cancelBooking([RC_bookings[0].RC_ID]);

    res.send('Reserva cancelada satisfactoriamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { deleteBooking };
