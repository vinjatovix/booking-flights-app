'use strict';

const { cancelBooking, getBookings } = require('../../repositories/booking/booking-repository');
const jwt = require('jsonwebtoken');

/**
 * Stores a new booking on the system
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteBooking({ headers }, res, next) {
  try {
    //? Recuperamos los datos del usuario de su token
    const token = headers.authorization;
    const decoded = jwt.decode(token);
    // Hacemos una consulta a la DB y recuperamos los datos de su reserva
    const RC_bookings = await getBookings(decoded.id);
    // Comprobamos que el usuario tenga alguna reserva hecha
    if (RC_bookings.length === 0) {
      const err = new Error();
      err.code = 400;
      err.details = 'No existen reservas';
      throw err;
    }
    cancelBooking([RC_bookings[0].RC_ID]);

    res.send('Reserva cancelada satisfactoriamente');
  } catch (err) {
    next(err);
  }
}

module.exports = { deleteBooking };
