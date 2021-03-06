'use strict';

const { cancelBooking, getBookings } = require('../../repositories/booking/booking-repository');
const jwt = require('jsonwebtoken');

async function deleteBooking({ headers }, res, next) {
  try {
    const token = headers.authorization;
    const decoded = jwt.decode(token);
    const RC_bookings = await getBookings(decoded.id);

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
